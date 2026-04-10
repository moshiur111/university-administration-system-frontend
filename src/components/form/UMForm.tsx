import { Form } from "antd";
import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
  type UseFormReturn,
} from "react-hook-form";

// generic typing
type TFormProps<T extends FieldValues> = {
  onSubmit: (data: T, methods: UseFormReturn<T>) => Promise<void>;
  children: ReactNode;
  defaultValues?: DefaultValues<T>;
  resolver?: Resolver<T>;
};

const UMForm = <T extends FieldValues>({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps<T>) => {
  const methods = useForm<T>({
    defaultValues,
    resolver,
    mode: "onChange",
  });

  const submit = async (data: T) => {
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
