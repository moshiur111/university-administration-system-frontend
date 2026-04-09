import { Card, Skeleton, Typography } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import type { TRTKError } from "../../../types";
import { useGetAllAcademicDepartmentQuery } from "../../academicDepartment/academicDepartment.api";
import { useGetAllAcademicFacultieQuery } from "../../academicFaculty/academicFaculty.api";
import { useGetAllCoursesQuery } from "../../course/course.api";
import { useGetEligibleFacultiesQuery } from "../../faculty/faculty.api";
import { useGetAllRegisteredSemestersQuery } from "../../semesterRegistration/semesterRegistration.api";
import OfferedCourseForm from "../components/OfferedCourseForm";
import { useCreateOfferedCourseMutation } from "../offeredCourse.api";

const { Title, Text } = Typography;

const CreateOfferedCourse = () => {
  const [academicDepartment, setAcademicDepartment] = useState("");

  const [createOfferedCourse, { isLoading: isCreating }] =
    useCreateOfferedCourseMutation();

  // Queries
  const { data: academicFaculties, isLoading: facLoading } =
    useGetAllAcademicFacultieQuery(undefined);

  const { data: registeredSemesters, isLoading: semLoading } =
    useGetAllRegisteredSemestersQuery(undefined);

  const { data: academicDepartments, isLoading: deptLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const { data: courses, isLoading: courseLoading } =
    useGetAllCoursesQuery(undefined);

  const { data: eligibleFaculties, isFetching } = useGetEligibleFacultiesQuery(
    { academicDepartment },
    { skip: !academicDepartment },
  );

  // Combined loading state
  const isInitialLoading =
    facLoading || semLoading || deptLoading || courseLoading;

  // Options
  const academicFacultyOptions =
    academicFaculties?.data?.map((i) => ({
      value: i._id,
      label: i.name,
    })) || [];

  const semesterOptions =
    registeredSemesters?.data?.map((i) => ({
      value: i._id,
      label: `${i.academicSemester.name} ${i.academicSemester.year}`,
    })) || [];

  const departmentOptions =
    academicDepartments?.data?.map((i) => ({
      value: i._id,
      label: i.name,
    })) || [];

  const courseOptions =
    courses?.data?.map((i) => ({
      value: i._id,
      label: i.title,
    })) || [];

  const facultyOptions =
    eligibleFaculties?.data?.map((i) => ({
      value: i._id,
      label: i.fullName,
    })) || [];

  const getErrorMessage = (err: unknown): string => {
    const error = err as TRTKError;

    return (
      error?.data?.errorSources?.[0]?.message ||
      error?.data?.message ||
      "Something went wrong!"
    );
  };

  const onSubmit = async (
    data: FieldValues,
    methods: UseFormReturn<FieldValues>,
  ) => {
    const toastId = toast.loading("Creating offered course...");

    const payload = {
      ...data,
      section: Number(data.section),
      maxCapacity: Number(data.maxCapacity),
      startTime: dayjs(data.startTime).format("HH:mm"),
      endTime: dayjs(data.endTime).format("HH:mm"),
    };

    try {
      const res = await createOfferedCourse(payload).unwrap();

      toast.success(res?.message || "Created successfully!", { id: toastId });
      methods.reset();
    } catch (err) {
      toast.error(getErrorMessage(err), { id: toastId });
    }
  };

  // Skeleton for initial load
  if (isInitialLoading) {
    return (
      <div
        style={{
          padding: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 900 }}>
          <Skeleton.Input active block style={{ height: 32 }} />
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "16px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 900 }}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
          styles={{
            body: { padding: "16px 20px" },
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: 16 }}>
            <Title level={4} style={{ marginBottom: 4 }}>
              Create Offered Course
            </Title>
            <Text type="secondary">
              Configure course schedule, faculty, and capacity
            </Text>
          </div>

          {/* Form */}
          <OfferedCourseForm
            onSubmit={onSubmit}
            isLoading={isCreating}
            academicFacultyOptions={academicFacultyOptions}
            semesterOptions={semesterOptions}
            departmentOptions={departmentOptions}
            courseOptions={courseOptions}
            facultyOptions={facultyOptions}
            onDepartmentChange={setAcademicDepartment}
            facultyDisabled={!academicDepartment || isFetching}
          />
        </Card>
      </div>
    </div>
  );
};

export default CreateOfferedCourse;
