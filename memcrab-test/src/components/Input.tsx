import type { FC, InputHTMLAttributes } from "react";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export const Input: FC<InputProps> = (props) => (
  <input min={0} max={100} className="input" {...props} />
);
