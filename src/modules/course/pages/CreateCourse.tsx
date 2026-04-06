import { Flex, Spin } from "antd";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import type { TRTKError } from "../../../types";
import CreateCourseForm from "../components/CreateCourseForm";
import { useAddCourseMutation, useGetAllCoursesQuery } from "../Course.api";

const CreateCourse = () => {
  const [createCourse, { isLoading: isCreating }] = useAddCourseMutation();

  const { data: courseData, isLoading } = useGetAllCoursesQuery(undefined);

  // Safe mapping
  const preRequisiteCoursesOptions =
    courseData?.data?.map((course) => ({
      value: course._id,
      label: course.title,
    })) || [];

  // Error extractor
  const getErrorMessage = (err: unknown): string => {
    const error = err as TRTKError;

    return (
      error?.data?.errorSources?.[0]?.message ||
      error?.data?.message ||
      "Something went wrong!"
    );
  };

  // Submit handler
  const onSubmit = async (
    formData: FieldValues,
    methods: UseFormReturn<FieldValues>,
  ) => {
    const toastId = toast.loading("Creating Course...");

    const payload = {
      ...formData,
      isDeleted: false,
      code: Number(formData.code),
      credits: Number(formData.credits),
      preRequisiteCourses: formData?.preRequisiteCourses
        ? formData.preRequisiteCourses.map((id: string) => ({
            course: id,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = await createCourse(payload).unwrap();

      toast.success(res?.message || "Course created successfully!", {
        id: toastId,
        duration: 2000,
      });

      methods.reset();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err), {
        id: toastId,
        duration: 2000,
      });
    }
  };

  // Loading UX
  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: "60vh" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <CreateCourseForm
      onSubmit={onSubmit}
      preRequisiteCoursesOptions={preRequisiteCoursesOptions}
      isLoading={isCreating}
    />
  );
};

export default CreateCourse;
