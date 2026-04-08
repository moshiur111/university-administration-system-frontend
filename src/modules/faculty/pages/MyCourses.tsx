import { Table, Tag, Typography } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useState } from "react";
import { useGetFacultyOfferedCoursesQuery } from "../../offeredCourse/offeredCourse.api";
import type { TFacultyOfferedCourse } from "../../offeredCourse/offeredCourse.types";
import type { TFacultyQueryParams } from "../faculty.types";

const { Title } = Typography;

const MyCourses = () => {
  const [params, setParams] = useState<TFacultyQueryParams>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useGetFacultyOfferedCoursesQuery(params);

  const courses = data?.data || [];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<TFacultyOfferedCourse>
      | SorterResult<TFacultyOfferedCourse>[],
  ) => {
    const newParams: TFacultyQueryParams = {
      page: pagination.current,
      limit: pagination.pageSize,
    };

    // Status filter
    if (filters.status && filters.status.length > 0) {
      newParams.status = filters.status[0] as string;
    }

    // Sorting
    if (!Array.isArray(sorter) && sorter.field) {
      if (typeof sorter.field === "string") {
        newParams.sortBy = sorter.field;
      }

      if (sorter.order) {
        newParams.sortOrder = sorter.order === "ascend" ? "asc" : "desc";
      }
    }

    setParams(newParams);
  };

  const columns: ColumnsType<TFacultyOfferedCourse> = [
    {
      title: "Course",
      dataIndex: ["course", "title"],
      key: "course",
      sorter: true,
      ellipsis: true,
      responsive: ["xs", "sm", "md", "lg"], // always show
    },
    {
      title: "Code",
      render: (_, record) => `${record.course.prefix}-${record.course.code}`,
      responsive: ["sm", "md", "lg"], // hide on very small
    },
    {
      title: "Credits",
      dataIndex: ["course", "credits"],
      sorter: true,
      responsive: ["md", "lg"],
    },
    {
      title: "Section",
      dataIndex: "section",
      sorter: true,
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Days",
      render: (_, record) =>
        record.days.map((day) => <Tag key={day}>{day}</Tag>),
      responsive: ["md", "lg"],
    },
    {
      title: "Time",
      render: (_, record) => `${record.startTime} - ${record.endTime}`,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Semester",
      render: (_, record) =>
        `${record.academicSemester.name} ${record.academicSemester.year}`,
      responsive: ["lg"], // only desktop
    },
    {
      title: "Status",
      key: "status",
      dataIndex: ["semesterRegistration", "status"],
      filters: [
        { text: "ONGOING", value: "ONGOING" },
        { text: "ENDED", value: "ENDED" },
      ],
      render: (status: string) => {
        const color =
          status === "ONGOING" ? "green" : status === "ENDED" ? "red" : "blue";

        return <Tag color={color}>{status}</Tag>;
      },
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Capacity",
      dataIndex: "maxCapacity",
      sorter: true,
      responsive: ["lg"],
    },
  ];

  return (
    <div style={{ padding: "16px" }}>
      <Title level={4} style={{ marginBottom: 16 }}>
        My Courses
      </Title>

      <Table
        rowKey="_id"
        loading={isLoading}
        columns={columns}
        dataSource={courses}
        onChange={handleTableChange}
        scroll={{ x: "max-content" }} // horizontal scroll
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.meta?.total,
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default MyCourses;
