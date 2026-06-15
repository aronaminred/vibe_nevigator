import type { ButtonHTMLAttributes, ReactNode } from "react";

type Win95ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
};

export function Win95Button({
  children,
  className = "",
  icon,
  type = "button",
  ...props
}: Win95ButtonProps) {
  return (
    <button type={type} className={`win95-button ${className}`} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
