import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-inherit p-6">
      <div className="flex items-center gap-3 text-xl text-white">
        <FaSpinner className="animate-spin text-4xl" />
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
