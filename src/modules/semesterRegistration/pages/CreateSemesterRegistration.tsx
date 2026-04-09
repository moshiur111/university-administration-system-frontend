import { Card, Flex, Spin, Typography } from "antd";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import type { TRTKError } from "../../../types";
import { useGetAllAcademicSemesterQuery } from "../../academicSemester/academicSemester.api";
import SemesterRegistrationForm from "../components/SemesterRegistrationForm";
import { useCreateSemesterRegistrationMutation } from "../semesterRegistration.api";

const { Title, Text } = Typography;

const CreateSemesterRegistration = () => {
  // Mutation for creating semester registration
  const [createSemesterRegistration, { isLoading: isCreating }] =
    useCreateSemesterRegistrationMutation();

  // Fetch academic semesters
  const { data, isLoading } = useGetAllAcademicSemesterQuery([
    { name: "sort", value: "year" },
  ]);

  // Transform API data to select options
  const academicSemesterOptions =
    data?.data?.map((item) => ({
      value: item._id,
      label: `${item.name} ${item.year}`,
    })) || [];

  // Handle form submit
  const onSubmit = async (
    formData: FieldValues,
    methods: UseFormReturn<FieldValues>,
  ) => {
    const toastId = toast.loading("Creating Semester Registration...");

    const payload = {
      ...formData,
      minCredit: Number(formData.minCredit),
      maxCredit: Number(formData.maxCredit),
    };

    try {
      const res = await createSemesterRegistration(payload).unwrap();

      toast.success(
        res?.message || "Semester Registration created successfully!",
        { id: toastId },
      );

      methods.reset();
    } catch (err) {
      const error = err as TRTKError;

      const errorMessage =
        error?.data?.errorSources?.[0]?.message ??
        error?.data?.message ??
        "Something went wrong!";

      toast.error(errorMessage, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  // Loading state (centered spinner with proper height)
  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: "50vh" }}>
        <Spin size="large" />
      </Flex>
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
      {/* Max width container for better readability */}
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
              Semester Registration
            </Title>
            <Text type="secondary">
              Configure a new semester registration period
            </Text>
          </div>

          {/* Form */}
          <SemesterRegistrationForm
            onSubmit={onSubmit}
            academicSemesterOptions={academicSemesterOptions}
            isLoading={isCreating}
          />
        </Card>
      </div>
    </div>
  );
};

export default CreateSemesterRegistration;
