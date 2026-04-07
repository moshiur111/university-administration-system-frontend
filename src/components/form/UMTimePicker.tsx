import { Form, TimePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TUMTimePickerProps = {
  name: string;
  label: string;
};

const UMTimePicker = ({ name, label }: TUMTimePickerProps) => {
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
          <TimePicker
            {...field}
            size="large"
            style={{ width: "100%" }}
            format="HH:mm"
          />
        </Form.Item>
      )}
    />
  );
};

export default UMTimePicker;
