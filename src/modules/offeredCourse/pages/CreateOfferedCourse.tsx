import { Flex, Spin } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import type { TRTKError } from "../../../types";
import { useGetAllAcademicDepartmentQuery } from "../../academicDepartment/academicDepartment.api";
import { useGetAllAcademicFacultieQuery } from "../../academicFaculty/academicFaculty.api";
import { useGetAllCoursesQuery } from "../../course/Course.api";
import { useGetEligibleFacultiesQuery } from "../../faculty/faculty.api";
import { useGetAllRegisteredSemestersQuery } from "../../semesterRegistration/semesterRegistration.api";
import OfferedCourseForm from "../components/OfferedCourseForm";
import { useCreateOfferedCourseMutation } from "../offeredCourse.api";

const CreateOfferedCourse = () => {
  const [academicDepartment, setAcademicDepartment] = useState("");

  const [createOfferedCourse, { isLoading }] = useCreateOfferedCourseMutation();

  // Queries
  const { data: academicFaculties } = useGetAllAcademicFacultieQuery(undefined);
  const { data: registeredSemesters } =
    useGetAllRegisteredSemestersQuery(undefined);
  const { data: academicDepartments } =
    useGetAllAcademicDepartmentQuery(undefined);
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const { data: eligibleFaculties, isFetching } = useGetEligibleFacultiesQuery(
    { academicDepartment },
    { skip: !academicDepartment },
  );

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

  if (!academicDepartments || !courses) {
    return (
      <Flex justify="center" align="center" style={{ height: "60vh" }}>
        <Spin />
      </Flex>
    );
  }

  return (
    <OfferedCourseForm
      onSubmit={onSubmit}
      isLoading={isLoading}
      academicFacultyOptions={academicFacultyOptions}
      semesterOptions={semesterOptions}
      departmentOptions={departmentOptions}
      courseOptions={courseOptions}
      facultyOptions={facultyOptions}
      onDepartmentChange={setAcademicDepartment}
      facultyDisabled={!academicDepartment || isFetching}
    />
  );
};

export default CreateOfferedCourse;
