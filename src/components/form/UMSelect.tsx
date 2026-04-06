import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type TUMSelectProps = {
  name: string;
  label: string;
  options: TOption[];
  disabled?: boolean;
  mode?: "multiple";
};

const UMSelect = ({ name, label, options, disabled, mode }: TUMSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Select
            mode={mode}
            options={options}
            size="large"
            disabled={disabled}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        </Form.Item>
      )}
    />
  );
};

export default UMSelect;
