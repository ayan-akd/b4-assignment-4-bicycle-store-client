import { Controller } from "react-hook-form";
import { Form, InputNumber } from "antd";

type TInputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
  onChange?: (value: number | null) => void;
  defaultValue?: number;
  max?: number;
  min?: number;
};
export default function CustomNumberInput({
  name,
  label,
  disabled,
  placeholder,
  readonly,
  onChange,
  defaultValue,
  max,
  min,
}: TInputProps) {
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
              readOnly={readonly}
              defaultValue={defaultValue}
              onChange={(value) => {
                field.onChange(value);
                onChange?.(value);
              }}
              max={max}
              min={min}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
}
