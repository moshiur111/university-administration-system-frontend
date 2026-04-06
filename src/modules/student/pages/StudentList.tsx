import type { TableColumnsType, TableProps } from "antd";
import { Button, Modal, Pagination, Space, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { TQueryParam } from "../../../types";
import {
  useBlockStudentMutation,
  useGetAllStudentsQuery,
} from "../student.api";
import type { TStudent } from "../student.types";

export type TTableData = Pick<
  TStudent,
  "_id" | "fullName" | "id" | "email" | "contactNo"
>;

const StudentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<TTableData | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParam[]>([]);

  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  // console.log(studentData);

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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // console.log(studentData);
  // console.log({ isLoading, isFetching });

  const metaData = studentData?.meta;

  const tableData =
    studentData?.data?.map(({ _id, fullName, id, email, contactNo }) => ({
      _id,
      fullName,
      id,
      email,
      contactNo,
    })) ?? [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Roll No.",
      dataIndex: "id",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Email",
      dataIndex: "email",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Contact No.",
      dataIndex: "contactNo",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/students/${item._id}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button danger onClick={() => handleBlockClick(item)}>
              Block
            </Button>
          </Space>
        );
      },
      width: "1%",
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
        queryParams.push({
          name: "name",
          value: item,
        }),
      );

      filters.year?.forEach((item) =>
        queryParams.push({
          name: "year",
          value: item,
        }),
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table<TTableData>
        rowKey="_id"
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Modal
        title="Confirm Block"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes, Block"
        cancelText="Cancel"
        confirmLoading={isBlocking}
      >
        <p>
          Are you sure you want to block{" "}
          <strong>{selectedStudent?.fullName}</strong>?
        </p>
      </Modal>
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentList;
