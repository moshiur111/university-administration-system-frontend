import type { TableColumnsType } from "antd";
import { Table, Typography } from "antd";

import { useGetAllCoursesQuery } from "../Course.api";
import type { TCourse } from "../Course.types";

const { Text } = Typography;

export type TTableData = Pick<TCourse, "_id" | "title" | "code" | "prefix">;

const Courses = () => {
  const { data, isFetching } = useGetAllCoursesQuery(undefined);

  // ✅ Safe mapping
  const tableData: TTableData[] =
    data?.data?.map(({ _id, title, prefix, code }) => ({
      _id,
      title,
      prefix,
      code,
    })) ?? [];

  // ✅ Columns
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Course Title",
      dataIndex: "title",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Course Code",
      render: (record) => `${record.prefix}${record.code}`,
    },
  ];

  return (
    <Table<TTableData>
      rowKey="_id"
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      bordered
      pagination={{ pageSize: 10 }}
      locale={{
        emptyText: "No courses found",
      }}
    />
  );
};

export default Courses;
