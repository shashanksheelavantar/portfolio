import Magnetic from "./Magnetic";

const VARIANTS = {
  primary: "bg-ink text-bg hover:opacity-90",
  secondary: "bg-transparent border border-border text-ink hover:bg-surface-2",
  ghost: "bg-transparent text-ink hover:bg-surface-2",
};

export default function Button({ children, variant = "primary", className = "", as: Tag = "a", magnetic = true, ...props }) {
  const content = (
    <Tag
      data-cursor="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 focus-ring ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
  if (!magnetic) return content;
  return <Magnetic as="span" className="rounded-full">{content}</Magnetic>;
}
