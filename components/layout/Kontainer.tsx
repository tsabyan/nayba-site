import type { ReactNode } from "react";

export function Kontainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-isi px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
