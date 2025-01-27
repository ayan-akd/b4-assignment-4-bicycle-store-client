import { Controller } from "react-hook-form";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";

type TInputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
};
export default function CustomTextArea({ name, label, disabled, placeholder, readonly }: TInputProps) {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TextArea
              variant="filled"
              {...field}
              id={name}
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
