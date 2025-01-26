import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

type TInputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
};
export default function CustomPassword({  name, label, disabled, placeholder }: TInputProps) {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input.Password
              variant="filled"
              {...field}
              id={name}
              size="large"
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
