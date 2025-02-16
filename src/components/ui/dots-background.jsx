"use client";

export function DotsBackground({
  children,
  className = "",
  containerClassName = "",
}) {
  return (
    <div className={`relative ${containerClassName}`}>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[radial-gradient(#8080800a_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}