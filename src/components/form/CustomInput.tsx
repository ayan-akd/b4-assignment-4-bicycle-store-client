import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
};
export default function CustomInput({ type, name, label, disabled, placeholder, readonly }: TInputProps) {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              variant="filled"
              {...field}
              id={name}
              type={type}
              size="large"
              disabled={disabled}
              placeholder={placeholder}
              readOnly={readonly}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
}
