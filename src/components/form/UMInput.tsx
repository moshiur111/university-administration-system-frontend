import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TUMInputProps = {
  label: string;
  name: string;
  type?: string;
  disabled?: boolean;
};

const UMInput = ({ label, name, type = "text", disabled }: TUMInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Input
            {...field}
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
            type={type}
            disabled={disabled}
          />
        </Form.Item>
      )}
    />
  );
};

export default UMInput;
