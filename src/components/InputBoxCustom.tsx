import { ChangeEvent, FC } from "react";

interface InputBoxCustomProps {
  type: "text" | "number" | "email" | "password";
  value: string | number;
  name: string;
  placeholder: string;
  error: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputBoxCustom: FC<InputBoxCustomProps> = ({
  type,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
}) => {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className="border-slate-800 border-opacity-10 border-2 rounded-md bg-secondary py-3 px-4 my-4 w-full"
      />
      {error && <p className="error">Input filed can't be empty!</p>}
    </div>
  );
};

export default InputBoxCustom;
