import { getInitials } from "../../utils/helpers";

function Avatar({ name, size = "md" }) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700 ${sizes[size]}`}
    >
      {getInitials(name)}
    </div>
  );
}

export default Avatar;