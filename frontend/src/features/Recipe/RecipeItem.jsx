import Button from "../../ui/Button.jsx";
import { useNavigate } from "react-router-dom";
import useToggleLike from "../../services/recipe/useToggleLike.js";
import useDeleteRecipe from "../../services/recipe/useDeleteRecipe.js";

export default function RecipeItem({ data, isEdit = false, isAdmin = false }) {
  const navigate = useNavigate(); // Hook for navigation
  const { isAdding, toggleLike } = useToggleLike();
  const { isDeleting, deleteRecipe } = useDeleteRecipe();

  const handleShowMore = () => {
    navigate(`/show/${data.id}`);
  };

  const handleLike = () => {
    toggleLike(data.id);
  };

  const handleUpdate = () => {
    navigate(`/edit/${data.id}`, {
      state: {
        data,
      },
    }); // Navigate to an edit page (assuming it exists)
  };

  const handleDelete = () => {
    deleteRecipe({ id: data.id });
  };

  return (
    <div className="rounded-lg bg-gradient-to-br from-slate-950 via-gray-900 to-black p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
      {/* Header Section */}
      <div className="mb-4 flex items-center justify-between">
        {/* Username */}
        <p className="text-sm font-medium text-gray-400">
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text font-semibold text-transparent">
            By:
          </span>{" "}
          {data.userName?.name || "Anonymous"}
        </p>

        {/* Like Button */}
        <Button
          content={
            <span className="flex items-center gap-1">
              ❤ <span className="hidden sm:inline">Like</span>
            </span>
          }
          type="button-edit"
          bgColor="bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 hover:from-purple-500 hover:via-red-500 hover:to-pink-500"
          handleClick={handleLike}
        />
      </div>

      {/* Recipe Title */}
      <h3 className="mb-2 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold text-transparent">
        {data.title}
      </h3>

      {/* Description */}
      <p className="mb-4 text-sm text-gray-300">
        {data?.description?.length > 100
          ? `${data.description.slice(0, 100)}...`
          : data.description}
      </p>

      {/* Footer Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Likes Count */}
        <p className="text-sm text-gray-400">
          ❤{" "}
          <span className="bg-gradient-to-r from-teal-400 to-lime-500 bg-clip-text font-medium text-transparent">
            {data.likes || 0}
          </span>{" "}
          Likes
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            content={
              <span className="flex items-center gap-1">
                🔍 <span className="sm:inline">Show More</span>
              </span>
            }
            type="button-primary"
            bgColor="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500"
            handleClick={handleShowMore}
          />

          {/* Conditionally Render Buttons Based on Props */}
          {isEdit && !isAdmin && (
            <>
              <Button
                content={
                  <span className="flex items-center gap-1">
                    ✏ <span className="sm:inline">Update</span>
                  </span>
                }
                type="button-edit"
                bgColor="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 hover:from-blue-500 hover:via-teal-500 hover:to-green-500"
                handleClick={handleUpdate}
                customClasses="w-full"
              />
            </>
          )}

          {isAdmin || isEdit ? (
            <Button
              content={
                <span className="flex items-center gap-1">
                  🗑 <span className="sm:inline">Delete</span>
                </span>
              }
              type="button-danger"
              bgColor="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-yellow-500 hover:via-orange-500 hover:to-red-500"
              handleClick={handleDelete}
              disabled={isDeleting}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
