import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

type TUMDatePickerProps = {
  name: string;
  label: string;
};

const UMDatePicker = ({ name, label }: TUMDatePickerProps) => {
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
          <DatePicker
            size="large"
            style={{ width: "100%" }}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => {
              field.onChange(date ? date.format("YYYY-MM-DD") : null);
            }}
            onBlur={field.onBlur}
          />
        </Form.Item>
      )}
    />
  );
};

export default UMDatePicker;
