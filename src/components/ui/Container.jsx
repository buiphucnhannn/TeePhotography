import { cn } from "@/lib/utils";

// wide: khối ảnh (1440px); mặc định: khối chữ (1200px)
export default function Container({ as: Tag = "div", wide = false, className, children, ...rest }) {
  return (
    <Tag
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-16", wide ? "max-w-[1440px]" : "max-w-[1200px]", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
