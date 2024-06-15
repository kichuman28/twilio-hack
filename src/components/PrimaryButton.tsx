import React, { FC } from "react";
interface PrimaryButtonProps {
  label: string;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const PrimaryButton: FC<PrimaryButtonProps> = ({
  label,
  disabled,
  onClick,
}) => {
  return (
    <button
      className="cursor-pointer bg-primary flex  flex-1 justify-center rounded-md py-4 w-full text-white font-bold disabled:bg-textPrimary disabled:bg-opacity-45"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
