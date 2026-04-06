import { Form } from "antd";
import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

type TFormProps = {
  onSubmit: (
    data: FieldValues,
    methods: UseFormReturn<FieldValues>,
  ) => Promise<void>;
  children: ReactNode;
  defaultValues?: Record<string, any>;
  resolver?: any;
};

const UMForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps) => {
  const methods = useForm({
    defaultValues,
    resolver,
    mode: "onChange",
  });

  const submit = async (data: FieldValues) => {
    await onSubmit(data, methods);
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default UMForm;
