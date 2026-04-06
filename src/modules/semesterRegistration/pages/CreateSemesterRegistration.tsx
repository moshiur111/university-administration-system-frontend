import { Flex, Spin } from "antd";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import type { TRTKError } from "../../../types";
import { useGetAllAcademicSemesterQuery } from "../../academicSemester/academicSemester.api";
import SemesterRegistrationForm from "../components/SemesterRegistrationForm";
import { useCreateSemesterRegistrationMutation } from "../semesterRegistration.api";

const CreateSemesterRegistration = () => {
  const [createSemesterRegistration, { isLoading: isCreating }] =
    useCreateSemesterRegistrationMutation();

  const { data, isLoading } = useGetAllAcademicSemesterQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions =
    data?.data?.map((item) => ({
      value: item._id,
      label: `${item.name} ${item.year}`,
    })) || [];

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
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

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: "60vh" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <SemesterRegistrationForm
      onSubmit={onSubmit}
      academicSemesterOptions={academicSemesterOptions}
      isLoading={isCreating}
    />
  );
};

export default CreateSemesterRegistration;
