import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TSelectProps = {
  label?: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  watch?: boolean;
  mode?: "multiple" | undefined;
  onValueChange?: (value: string) => void;
  placeholder?: string;
};

export default function CustomSelect({
  label,
  name,
  options,
  disabled,
  mode,
  watch,
  onValueChange,
  placeholder
}: TSelectProps) {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });
  useEffect(() => {
    if (!watch) {
      return;
    }
    if (onValueChange) {
      onValueChange(inputValue);
    }
  }, [inputValue, onValueChange, watch]);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            placeholder={placeholder}
            variant="filled"
            style={{ width: "100%" }}
            size="large"
            {...field}
            options={options}
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
}
