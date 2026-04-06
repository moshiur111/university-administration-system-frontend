import type { MenuProps, TableColumnsType } from "antd";
import { Button, Dropdown, Table, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "sonner";

import type { TRTKError } from "../../../types";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateSemesterRegistrationMutation,
} from "../semesterRegistration.api";
import type { TSemesterRegistration } from "../semesterRegistration.types";

const { Text } = Typography;

export type TTableData = Pick<
  TSemesterRegistration,
  "_id" | "status" | "startDate" | "endDate"
> & {
  name: string;
};

// Status Config
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
  const { data, isFetching } = useGetAllRegisteredSemestersQuery(undefined);

  const [updateSemesterRegistration] = useUpdateSemesterRegistrationMutation();

  // Track which row is updating
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Data Mapping
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

  // Error extractor
  const getErrorMessage = (err: unknown): string => {
    const error = err as TRTKError;

    return (
      error?.data?.errorSources?.[0]?.message ||
      error?.data?.message ||
      "Something went wrong!"
    );
  };

  // Status update handler
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
        duration: 2000,
      });
    } catch (err: unknown) {
      toast.error(getErrorMessage(err), {
        id: toastId,
        duration: 2000,
      });
    } finally {
      setUpdatingId(null);
    }
  };

  // Columns
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Semester",
      dataIndex: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <Tag color={STATUS_COLOR_MAP[status]}>{status}</Tag>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
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
              loading={updatingId === record._id}
              disabled={!!updatingId && updatingId !== record._id}
            >
              Update Status
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Table<TTableData>
      rowKey="_id"
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      pagination={{ pageSize: 10 }}
      bordered
      locale={{
        emptyText: "No semester registrations found",
      }}
    />
  );
};

export default RegisteredSemesters;
