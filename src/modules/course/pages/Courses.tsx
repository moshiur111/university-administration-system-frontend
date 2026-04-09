import type { TableColumnsType } from "antd";
import { Empty, Skeleton, Table, Typography } from "antd";
import { useGetAllCoursesQuery } from "../course.api";
import type { TCourse } from "../Course.types";

const { Text, Title } = Typography;

export type TTableData = Pick<TCourse, "_id" | "title" | "code" | "prefix">;

const Courses = () => {
  const {
    data,
    isLoading, // first load
    isFetching, // refetch
  } = useGetAllCoursesQuery(undefined);

  // Safe mapping
  const tableData: TTableData[] =
    data?.data?.map(({ _id, title, prefix, code }) => ({
      _id,
      title,
      prefix,
      code,
    })) ?? [];

  // Responsive columns
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Course Title",
      dataIndex: "title",
      render: (text) => <Text strong>{text}</Text>,
      ellipsis: true,
    },
    {
      title: "Course Code",
      render: (record) => `${record.prefix}${record.code}`,
      responsive: ["sm"], // hide on extra small screens
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
      <Title level={4} style={{ marginBottom: 12 }}>
        Courses
      </Title>

      {/* Table */}
      <Table<TTableData>
        rowKey="_id"
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }} // responsive safety
        locale={{
          emptyText: <Empty description="No courses found" />,
        }}
      />
    </div>
  );
};

export default Courses;
