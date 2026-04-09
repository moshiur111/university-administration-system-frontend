import type { TableColumnsType } from "antd";
import { Empty, Skeleton, Space, Table, Tag, Typography } from "antd";

import { useGetAllOfferedCoursesQuery } from "../offeredCourse.api";

const { Text, Title } = Typography;

// Table type
export type TTableData = {
  _id: string;
  course:
    | {
        title: string;
        prefix: string;
        code: number;
      }
    | string
    | null;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  maxCapacity: number;
  isDeleted: boolean;
};

const OfferedCourses = () => {
  const {
    data: offeredCoursesData,
    isLoading, // first load
    isFetching, // refetch
  } = useGetAllOfferedCoursesQuery(undefined);

  const tableData: TTableData[] =
    offeredCoursesData?.data?.map((item) => ({
      _id: item._id,
      course: item.course ?? null,
      section: item.section,
      days: item.days || [],
      startTime: item.startTime,
      endTime: item.endTime,
      maxCapacity: item.maxCapacity,
      isDeleted: item.isDeleted,
    })) ?? [];

  // Columns
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Course",
      render: (_, record) => {
        if (!record.course) {
          return <Text type="secondary">N/A</Text>;
        }

        if (typeof record.course === "string") {
          return <Text strong>{record.course}</Text>;
        }

        return (
          <Space wrap>
            <Tag color="blue">
              {record.course.prefix}
              {record.course.code}
            </Tag>
            <Text>{record.course.title}</Text>
          </Space>
        );
      },
      ellipsis: true,
    },
    {
      title: "Section",
      dataIndex: "section",
      align: "center",
      responsive: ["sm"],
    },
    {
      title: "Days",
      dataIndex: "days",
      render: (days: string[]) =>
        days.length ? (
          <Space wrap>
            {days.map((day) => (
              <Tag key={day}>{day}</Tag>
            ))}
          </Space>
        ) : (
          <Text type="secondary">N/A</Text>
        ),
      responsive: ["md"],
    },
    {
      title: "Time",
      render: (_, record) => (
        <Text>
          {record.startTime} - {record.endTime}
        </Text>
      ),
      responsive: ["sm"],
    },
    {
      title: "Capacity",
      dataIndex: "maxCapacity",
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "Status",
      dataIndex: "isDeleted",
      render: (isDeleted: boolean) => (
        <Tag color={isDeleted ? "red" : "green"}>
          {isDeleted ? "Deleted" : "Active"}
        </Tag>
      ),
    },
  ];

  // Skeleton for first load
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton.Input active block style={{ height: 32 }} />
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Title level={4} style={{ margin: 0 }}>
        Offered Courses
      </Title>

      {/* Table */}
      <Table<TTableData>
        rowKey="_id"
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: "max-content" }}
        locale={{
          emptyText: <Empty description="No offered courses found" />,
        }}
      />
    </div>
  );
};

export default OfferedCourses;
