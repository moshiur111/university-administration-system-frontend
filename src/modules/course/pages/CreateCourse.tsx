// import { Flex, Spin } from "antd";
// import type { FieldValues, UseFormReturn } from "react-hook-form";
// import { toast } from "sonner";

// import type { TRTKError } from "../../../types";
// import CreateCourseForm from "../components/CreateCourseForm";
// import { useAddCourseMutation, useGetAllCoursesQuery } from "../Course.api";

// const CreateCourse = () => {
//   const [createCourse, { isLoading: isCreating }] = useAddCourseMutation();

//   const { data: courseData, isLoading } = useGetAllCoursesQuery(undefined);

//   // Safe mapping
//   const preRequisiteCoursesOptions =
//     courseData?.data?.map((course) => ({
//       value: course._id,
//       label: course.title,
//     })) || [];

//   // Error extractor
//   const getErrorMessage = (err: unknown): string => {
//     const error = err as TRTKError;

//     return (
//       error?.data?.errorSources?.[0]?.message ||
//       error?.data?.message ||
//       "Something went wrong!"
//     );
//   };

//   // Submit handler
//   const onSubmit = async (
//     formData: FieldValues,
//     methods: UseFormReturn<FieldValues>,
//   ) => {
//     const toastId = toast.loading("Creating Course...");

//     const payload = {
//       ...formData,
//       isDeleted: false,
//       code: Number(formData.code),
//       credits: Number(formData.credits),
//       preRequisiteCourses: formData?.preRequisiteCourses
//         ? formData.preRequisiteCourses.map((id: string) => ({
//             course: id,
//             isDeleted: false,
//           }))
//         : [],
//     };

//     try {
//       const res = await createCourse(payload).unwrap();

//       toast.success(res?.message || "Course created successfully!", {
//         id: toastId,
//         duration: 2000,
//       });

//       methods.reset();
//     } catch (err: unknown) {
//       toast.error(getErrorMessage(err), {
//         id: toastId,
//         duration: 2000,
//       });
//     }
//   };

//   // Loading UX
//   if (isLoading) {
//     return (
//       <Flex justify="center" align="center" style={{ height: "60vh" }}>
//         <Spin size="large" />
//       </Flex>
//     );
//   }

//   return (
//     <CreateCourseForm
//       onSubmit={onSubmit}
//       preRequisiteCoursesOptions={preRequisiteCoursesOptions}
//       isLoading={isCreating}
//     />
//   );
// };

// export default CreateCourse;

import { Card, Skeleton, Typography } from "antd";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import type { TRTKError } from "../../../types";
import CreateCourseForm from "../components/CreateCourseForm";
import { useAddCourseMutation, useGetAllCoursesQuery } from "../course.api";

const { Title, Text } = Typography;

const CreateCourse = () => {
  const [createCourse, { isLoading: isCreating }] = useAddCourseMutation();

  const {
    data: courseData,
    isLoading, // first load
  } = useGetAllCoursesQuery(undefined);

  // Map prerequisite options
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
      });

      methods.reset();
    } catch (err) {
      toast.error(getErrorMessage(err), {
        id: toastId,
      });
    }
  };

  // Skeleton for first load
  if (isLoading) {
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
      {/* Centered container */}
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
              Create Course
            </Title>
            <Text type="secondary">
              Add a new course with prerequisites and credit structure
            </Text>
          </div>

          {/* Form */}
          <CreateCourseForm
            onSubmit={onSubmit}
            preRequisiteCoursesOptions={preRequisiteCoursesOptions}
            isLoading={isCreating}
          />
        </Card>
      </div>
    </div>
  );
};

export default CreateCourse;
