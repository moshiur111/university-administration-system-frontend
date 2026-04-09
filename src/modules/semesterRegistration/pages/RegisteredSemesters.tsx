import type { MenuProps, TableColumnsType } from "antd";
import {
  Button,
  Dropdown,
  Empty,
  Grid,
  Skeleton,
  Table,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "sonner";

import type { TRTKError } from "../../../types";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateSemesterRegistrationMutation,
} from "../semesterRegistration.api";
import type { TSemesterRegistration } from "../semesterRegistration.types";

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

export type TTableData = Pick<
  TSemesterRegistration,
  "_id" | "status" | "startDate" | "endDate"
> & {
  name: string;
};

const STATUS_OPTIONS = [
  { label: "Upcoming", key: "UPCOMING" },
  { label: "Ongoing", key: "ONGOING" },
  { label: "Ended", key: "ENDED" },
];

const STATUS_COLOR_MAP: Record<string, string> = {
  UPCOMING: "blue",
  ONGOING: "green",
  ENDED: "red",
};

const RegisteredSemesters = () => {
  const screens = useBreakpoint();

  const {
    data,
    isLoading, // first load
    isFetching, // refetch
  } = useGetAllRegisteredSemestersQuery(undefined);

  const [updateSemesterRegistration] = useUpdateSemesterRegistrationMutation();

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Map data
  const tableData: TTableData[] =
    data?.data?.map((item) => ({
      _id: item._id,
      name: item.academicSemester
        ? `${item.academicSemester.name} ${item.academicSemester.year}`
        : "N/A",
      status: item.status,
      startDate: dayjs(item.startDate).format("DD MMM YYYY"),
      endDate: dayjs(item.endDate).format("DD MMM YYYY"),
    })) ?? [];

  const getErrorMessage = (err: unknown): string => {
    const error = err as TRTKError;

    return (
      error?.data?.errorSources?.[0]?.message ||
      error?.data?.message ||
      "Something went wrong!"
    );
  };

  const handleStatusUpdate = async (
    id: string,
    currentStatus: string,
    newStatus: string,
  ) => {
    if (currentStatus === newStatus) {
      toast.info("Status is already selected");
      return;
    }

    const toastId = toast.loading("Updating status...");
    setUpdatingId(id);

    try {
      const res = await updateSemesterRegistration({
        id,
        data: { status: newStatus },
      }).unwrap();

      toast.success(res?.message || "Status updated successfully", {
        id: toastId,
      });
    } catch (err) {
      toast.error(getErrorMessage(err), {
        id: toastId,
      });
    } finally {
      setUpdatingId(null);
    }
  };

  // Responsive columns
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Semester",
      dataIndex: "name",
      render: (text) => <Text strong>{text}</Text>,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <Tag color={STATUS_COLOR_MAP[status]}>{status}</Tag>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      responsive: ["sm"],
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      fixed: screens.md ? "right" : undefined,
      render: (record) => {
        const menu: MenuProps = {
          items: STATUS_OPTIONS.map((item) => ({
            ...item,
            disabled: item.key === record.status,
          })),
          onClick: ({ key }) =>
            handleStatusUpdate(record._id, record.status, key),
        };

        return (
          <Dropdown menu={menu} trigger={["click"]}>
            <Button
              size={screens.xs ? "small" : "middle"}
              loading={updatingId === record._id}
              disabled={!!updatingId && updatingId !== record._id}
            >
              Update
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  // Skeleton for first load
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton.Input active block style={{ height: 32 }} />
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Title level={4} style={{ margin: 0 }}>
        Registered Semesters
      </Title>

      {/* Table */}
      <Table<TTableData>
        rowKey="_id"
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 10 }}
        bordered
        locale={{
          emptyText: <Empty description="No semester registrations found" />,
        }}
      />
    </div>
  );
};

export default RegisteredSemesters;
