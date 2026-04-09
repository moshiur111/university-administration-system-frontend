import type { TableColumnsType, TableProps } from "antd";
import {
  Button,
  Empty,
  Grid,
  Modal,
  Pagination,
  Skeleton,
  Space,
  Table,
  Typography,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { TQueryParam } from "../../../types";
import {
  useBlockStudentMutation,
  useGetAllStudentsQuery,
} from "../student.api";
import type { TStudent } from "../student.types";

const { Title } = Typography;
const { useBreakpoint } = Grid;

export type TTableData = Pick<
  TStudent,
  "_id" | "fullName" | "id" | "email" | "contactNo"
>;

const StudentList = () => {
  const screens = useBreakpoint();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<TTableData | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParam[]>([]);

  const {
    data: studentData,
    isLoading, // first load
    isFetching, // refetch
  } = useGetAllStudentsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const [blockStudent, { isLoading: isBlocking }] = useBlockStudentMutation();

  const handleBlockClick = (record: TTableData) => {
    setSelectedStudent(record);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (selectedStudent?._id) {
      const toastId = toast.loading("Blocking student...");

      try {
        const result = await blockStudent(selectedStudent._id).unwrap();
        console.log("Block success:", result);
        toast.success("Student blocked successfully!", {
          id: toastId,
          duration: 2000,
        });
      } catch (error) {
        console.log("Block failed:", error);
        toast.error("Failed to block student!", {
          id: toastId,
          duration: 2000,
        });
      }
    }

    setIsModalOpen(false);
  };

  const metaData = studentData?.meta;

  const tableData =
    studentData?.data?.map(({ _id, fullName, id, email, contactNo }) => ({
      _id,
      fullName,
      id,
      email,
      contactNo,
    })) ?? [];

  // Responsive columns
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
      ellipsis: true,
    },
    {
      title: "Roll",
      dataIndex: "id",
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      responsive: ["md"],
      ellipsis: true,
    },
    {
      title: "Contact",
      dataIndex: "contactNo",
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "action",
      fixed: screens.md ? "right" : undefined,
      render: (item) => (
        <Space wrap>
          <Link to={`/admin/students/${item._id}`}>
            <Button size={screens.xs ? "small" : "middle"}>Details</Button>
          </Link>

          <Button size={screens.xs ? "small" : "middle"}>Update</Button>

          <Button
            danger
            size={screens.xs ? "small" : "middle"}
            onClick={() => handleBlockClick(item)}
          >
            Block
          </Button>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra,
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item }),
      );

      setParams(queryParams);
    }
  };

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
        Students
      </Title>

      {/* Table */}
      <Table<TTableData>
        rowKey="_id"
        loading={isFetching} // spinner for refetch
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        scroll={{ x: "max-content" }}
        locale={{
          emptyText: <Empty description="No students found" />,
        }}
      />

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={metaData?.limit}
          total={metaData?.total}
          showSizeChanger
        />
      </div>

      {/* Modal */}
      <Modal
        title="Confirm Block"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Yes, Block"
        cancelText="Cancel"
        confirmLoading={isBlocking}
      >
        <p>
          Are you sure you want to block{" "}
          <strong>{selectedStudent?.fullName}</strong>?
        </p>
      </Modal>
    </div>
  );
};

export default StudentList;
