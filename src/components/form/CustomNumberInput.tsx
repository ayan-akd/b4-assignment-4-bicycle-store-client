import { Controller } from "react-hook-form";
import { Form, InputNumber } from "antd";

type TInputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
};
export default function CustomNumberInput({ name, label, disabled, placeholder }: TInputProps) {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <InputNumber
              variant="filled"
              {...field}
              id={name}
              size="large"
              style={{ width: "100%" }}
              disabled={disabled}
              placeholder={placeholder}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
}
