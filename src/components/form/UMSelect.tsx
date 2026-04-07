import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type TUMSelectProps<T = string> = {
  name: string;
  label: string;
  options?: TOption[];
  disabled?: boolean;
  mode?: "multiple";
  onValueChange?: (value: T) => void;
};

const UMSelect = <T = string,>({
  name,
  label,
  options,
  disabled,
  mode,
  onValueChange,
}: TUMSelectProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, ...restField },
        fieldState: { error },
      }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Select
            {...restField}
            mode={mode}
            options={options}
            size="large"
            disabled={disabled}
            style={{ width: "100%" }}
            onChange={(value: T) => {
              onChange(value);
              onValueChange?.(value);
            }}
          />
        </Form.Item>
      )}
    />
  );
};

export default UMSelect;
