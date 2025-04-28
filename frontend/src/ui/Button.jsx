import { NavLink } from "react-router-dom";

function Button({
  content,
  type = "button-primary",
  to,
  disabled,
  handleClick = () => {},
  bgColor = "", // New prop for custom background color
  customClasses = "",
}) {
  if (type === "link") {
    return (
      <NavLink
        to={to}
        className={`block w-full rounded-lg px-4 py-2 text-center font-semibold text-white shadow-md duration-200 hover:opacity-90 focus:outline-none focus:ring-2 ${
          bgColor || "bg-blue-500 focus:ring-blue-400"
        }`}
      >
        {content}
      </NavLink>
    );
  }

  if (type === "button-edit") {
    return (
      <button
        disabled={disabled}
        className={`rounded px-4 py-2 font-semibold text-white transition duration-200 ${customClasses} ${
          disabled
            ? "cursor-not-allowed bg-gray-400"
            : `${bgColor || "bg-blue-600 hover:bg-blue-500"}`
        }`}
        onClick={handleClick}
      >
        {content}
      </button>
    );
  }

  if (type === "button-delete") {
    return (
      <button
        disabled={disabled}
        className={`rounded px-4 py-2 font-semibold text-white transition duration-200 ${customClasses} ${
          disabled
            ? "cursor-not-allowed bg-gray-400"
            : `${bgColor || "bg-red-600 hover:bg-red-500"}`
        }`}
        onClick={handleClick}
      >
        {content}
      </button>
    );
  }

  return (
    <button
      disabled={disabled}
      className={`w-full rounded-lg px-4 py-2 font-semibold text-white shadow-md duration-200 ${customClasses} ${
        disabled
          ? "cursor-not-allowed bg-gray-400"
          : `${
              bgColor ||
              (type === "button-primary-red"
                ? "bg-red-600 hover:bg-red-500 focus:ring-red-400"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400")
            } focus:outline-none focus:ring-2 focus:ring-opacity-75`
      }`}
      onClick={handleClick}
    >
      {content}
    </button>
  );
}

export default Button;
