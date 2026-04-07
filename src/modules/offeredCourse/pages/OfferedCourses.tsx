import type { TableColumnsType } from "antd";
import { Table, Tag, Typography } from "antd";

import { useGetAllOfferedCoursesQuery } from "../offeredCourse.api";

const { Text } = Typography;

// ✅ Table type
export type TTableData = {
  _id: string;
  course: {
    title: string;
    prefix: string;
    code: number;
  } | null;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  maxCapacity: number;
  isDeleted: boolean;
};

const OfferedCourses = () => {
  const { data: offeredCoursesData, isFetching } =
    useGetAllOfferedCoursesQuery(undefined);

  console.log(offeredCoursesData);

  // ✅ Safe mapping
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

  // ✅ Columns
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Course",
      render: (_, record) => {
        if (!record.course) {
          return <Text type="secondary">N/A</Text>;
        }

        // If backend returns string (ID)
        if (typeof record.course === "string") {
          return <Text strong>{record.course}</Text>;
        }

        // If populated
        return (
          <>
            <Tag color="blue">
              {record.course.prefix}
              {record.course.code}
            </Tag>
            <Text style={{ marginLeft: 8 }}>{record.course.title}</Text>
          </>
        );
      },
    },
    {
      title: "Section",
      dataIndex: "section",
      align: "center",
    },
    {
      title: "Days",
      dataIndex: "days",
      render: (days: string[]) =>
        days.length ? (
          <>
            {days.map((day) => (
              <Tag color="blue" key={day}>
                {day}
              </Tag>
            ))}
          </>
        ) : (
          <Text type="secondary">N/A</Text>
        ),
    },
    {
      title: "Class Time",
      render: (_, record) => (
        <Text>
          {record.startTime} - {record.endTime}
        </Text>
      ),
    },
    {
      title: "Capacity",
      dataIndex: "maxCapacity",
      align: "center",
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

  return (
    <Table<TTableData>
      rowKey="_id"
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      pagination={{ pageSize: 10 }}
      bordered
      locale={{
        emptyText: "No offered courses found",
      }}
    />
  );
};

export default OfferedCourses;
