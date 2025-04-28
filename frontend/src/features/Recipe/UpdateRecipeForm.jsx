import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import Button from "../../ui/Button.jsx";
import useCreateRecipe from "../../services/recipe/useCreateRecipe.js";
import { useLocation, useParams } from "react-router-dom";

function UpdateRecipeForm() {
  const { id } = useParams();
  const { state } = useLocation();

  const { register, handleSubmit, control, formState, setValue } = useForm({
    defaultValues: {
      title: state?.data?.title || "",
      description: state?.data?.description || "",
      instructions: state?.data?.instructions || "",
      preparationTime: state?.data?.preparationTime || "",
      cookingTime: state?.data?.cookingTime || "",
      cuisine: state?.data?.cuisine || "",
      dietaryPreferences: state?.data?.dietaryPreferences || "",
      ingredients: state?.data?.ingredients || [{ ingName: "" }],
    },
  });

  const { errors } = formState;
  const { isAdding, createRecipe } = useCreateRecipe();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  // UseEffect to populate the ingredients when the form loads
  useEffect(() => {
    if (state?.data?.ingredients && state?.data?.ingredients.length) {
      // Pre-populate ingredients into the field array
      state?.data?.ingredients.forEach((ingredient, index) => {
        setValue(`ingredients.${index}.ingName`, ingredient.ingName);
      });
    }
  }, [state?.data?.ingredients, setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    const recipeData = {
      ...data,
      ingredients: data.ingredients.filter((ingredient) => ingredient.ingName), // Clean empty ingredient fields
    };
    createRecipe({ recipeData, id });
  };

  const onError = (error) => {
    console.error("Form submission error:", error);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-12">
      <div className="w-full max-w-3xl rounded-lg bg-gray-800 p-8 shadow-lg">
        <p className="mb-8 text-center text-lg font-semibold text-gray-100">
          Update A Recipe
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* Recipe Title */}
          <FormRow label="Recipe Title" error={errors?.title?.message}>
            <input
              className="input"
              placeholder="Enter recipe title"
              type="text"
              id="title"
              {...register("title", { required: "Recipe title is required" })}
            />
          </FormRow>

          {/* Recipe Description */}
          <FormRow label="Description" error={errors?.description?.message}>
            <textarea
              className="input"
              placeholder="Enter recipe description"
              rows="4"
              id="description"
              {...register("description", {
                required: "Recipe description is required",
              })}
            />
          </FormRow>

          {/* Ingredients Section */}
          <FormRow label="Ingredients">
            {fields.map((field, index) => (
              <div key={field.id} className="mb-4">
                <div className="flex items-center">
                  <input
                    className="input flex-1"
                    placeholder={`Ingredient ${index + 1}`}
                    {...register(`ingredients.${index}.ingName`, {
                      required: "Ingredient cannot be empty",
                    })}
                  />
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>

                {/* Display individual ingredient errors directly below each input */}
                {errors?.ingredients?.[index]?.ingName && (
                  <p className="mt-1 block text-sm text-red-500">
                    {errors.ingredients[index].ingName.message}
                  </p>
                )}
              </div>
            ))}

            <button
              type="button"
              className="text-blue-500"
              onClick={() => append({ ingName: "" })}
            >
              Add another ingredient
            </button>
          </FormRow>

          {/* Recipe Instructions */}
          <FormRow label="Instructions" error={errors?.instructions?.message}>
            <textarea
              className="input"
              placeholder="Enter cooking instructions"
              rows="6"
              id="instructions"
              {...register("instructions", {
                required: "Cooking instructions are required",
              })}
            />
          </FormRow>

          {/* Preparation Time */}
          <FormRow
            label="Preparation Time (minutes)"
            error={errors?.preparationTime?.message}
          >
            <input
              className="input"
              placeholder="Enter preparation time"
              type="number"
              id="preparationTime"
              {...register("preparationTime", {
                required: "Preparation time is required",
                valueAsNumber: true,
              })}
            />
          </FormRow>

          {/* Cooking Time */}
          <FormRow
            label="Cooking Time (minutes)"
            error={errors?.cookingTime?.message}
          >
            <input
              className="input"
              placeholder="Enter cooking time"
              type="number"
              id="cookingTime"
              {...register("cookingTime", {
                required: "Cooking time is required",
                valueAsNumber: true,
              })}
            />
          </FormRow>

          {/* Cuisine */}
          <FormRow label="Cuisine" error={errors?.cuisine?.message}>
            <input
              className="input"
              placeholder="Enter cuisine type"
              type="text"
              id="cuisine"
              {...register("cuisine", {
                required: "Cuisine is required",
              })}
            />
          </FormRow>

          {/* Dietary Preferences */}
          <FormRow
            label="Dietary Preferences"
            error={errors?.dietaryPreferences?.message}
          >
            <input
              className="input"
              placeholder="Enter dietary preferences (comma separated)"
              type="text"
              id="dietaryPreferences"
              {...register("dietaryPreferences", {
                required: "Dietary preferences are required",
              })}
            />
          </FormRow>

          {/* Submit Button */}
          <FormRow label="Submit">
            <Button content="Update Recipe" type="submit" disabled={isAdding} />
          </FormRow>
        </form>
      </div>
    </div>
  );
}

export default UpdateRecipeForm;
