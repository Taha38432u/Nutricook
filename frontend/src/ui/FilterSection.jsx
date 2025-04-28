import { useForm } from "react-hook-form";
import FormRow from "../ui/FormRow.jsx";
import Button from "../ui/Button.jsx";

function FilterSection({ onFilterChange }) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const blankState = {
    caloriesMin: "",
    caloriesMax: "",
    proteinMin: "",
    proteinMax: "",
    fatMin: "",
    fatMax: "",
    carbsMin: "",
    carbsMax: "",
    cookingTimeMin: "",
    cookingTimeMax: "",
    preparationTimeMin: "",
    preparationTimeMax: "",
    ingredients: "",
    cuisineType: "",
    sortBy: "",
  };

  const onSubmit = (data) => {
    onFilterChange(data);
  };

  function resetFilters() {
    onFilterChange(blankState);
  }

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <div className="mb-4 flex flex-col items-center bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900">
      <div className="w-full max-w-[800px] rounded-lg bg-gray-800 p-8 shadow-lg">
        <p className="mb-8 text-center text-lg font-semibold text-gray-100">
          Apply Filters
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          {/* Calories Filter */}
          <FormRow label="Calories" error={errors?.caloriesMin?.message}>
            <div className="flex gap-4">
              <input
                className="input"
                placeholder="Min"
                type="number"
                id="caloriesMin"
                {...register("caloriesMin", { valueAsNumber: true })}
              />
              <input
                className="input"
                placeholder="Max"
                type="number"
                id="caloriesMax"
                {...register("caloriesMax", { valueAsNumber: true })}
              />
            </div>
          </FormRow>

          {/* Protein Filter */}
          <FormRow label="Protein (g)" error={errors?.proteinMin?.message}>
            <div className="flex gap-4">
              <input
                className="input"
                placeholder="Min"
                type="number"
                id="proteinMin"
                {...register("proteinMin", { valueAsNumber: true })}
              />
              <input
                className="input"
                placeholder="Max"
                type="number"
                id="proteinMax"
                {...register("proteinMax", { valueAsNumber: true })}
              />
            </div>
          </FormRow>

          {/* Fat Filter */}
          <FormRow label="Fat (g)" error={errors?.fatMin?.message}>
            <div className="flex gap-4">
              <input
                className="input"
                placeholder="Min"
                type="number"
                id="fatMin"
                {...register("fatMin", { valueAsNumber: true })}
              />
              <input
                className="input"
                placeholder="Max"
                type="number"
                id="fatMax"
                {...register("fatMax", { valueAsNumber: true })}
              />
            </div>
          </FormRow>

          {/* Carbohydrates Filter */}
          <FormRow label="Carbohydrates (g)" error={errors?.carbsMin?.message}>
            <div className="flex gap-4">
              <input
                className="input"
                placeholder="Min"
                type="number"
                id="carbsMin"
                {...register("carbsMin", { valueAsNumber: true })}
              />
              <input
                className="input"
                placeholder="Max"
                type="number"
                id="carbsMax"
                {...register("carbsMax", { valueAsNumber: true })}
              />
            </div>
          </FormRow>

          {/* Cooking Time Filter */}
          <FormRow
            label="Cooking Time (minutes)"
            error={errors?.cookingTimeMin?.message}
          >
            <div className="flex gap-4">
              <input
                className="input"
                placeholder="Min"
                type="number"
                id="cookingTimeMin"
                {...register("cookingTimeMin", { valueAsNumber: true })}
              />
              <input
                className="input"
                placeholder="Max"
                type="number"
                id="cookingTimeMax"
                {...register("cookingTimeMax", { valueAsNumber: true })}
              />
            </div>
          </FormRow>

          {/* Preparation Time Filter */}
          <FormRow
            label="Preparation Time (minutes)"
            error={errors?.preparationTimeMin?.message}
          >
            <div className="flex gap-4">
              <input
                className="input"
                placeholder="Min"
                type="number"
                id="preparationTimeMin"
                {...register("preparationTimeMin", { valueAsNumber: true })}
              />
              <input
                className="input"
                placeholder="Max"
                type="number"
                id="preparationTimeMax"
                {...register("preparationTimeMax", { valueAsNumber: true })}
              />
            </div>
          </FormRow>

          {/* Ingredients Search Filter */}
          <FormRow
            label="Search by Ingredients"
            error={errors?.ingredients?.message}
          >
            <input
              className="input"
              placeholder="Enter ingredients"
              type="text"
              id="ingredients"
              {...register("ingredients")}
            />
          </FormRow>

          {/* Cuisine Type Filter */}
          <FormRow label="Cuisine Type" error={errors?.cuisineType?.message}>
            <select
              className="input"
              id="cuisineType"
              {...register("cuisineType")}
            >
              <option value="">Select Cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              {/* Add more options as needed */}
            </select>
          </FormRow>

          {/* Sorting Options */}
          <FormRow label="Sort By" error={errors?.sortBy?.message}>
            <select className="input" id="sortBy" {...register("sortBy")}>
              <option value="">Select Sorting Option</option>
              <option value="likesAsc">Likes (Ascending)</option>
              <option value="likesDesc">Likes (Descending)</option>
              <option value="dateAsc">Date (Oldest First)</option>
              <option value="dateDesc">Date (Newest First)</option>
            </select>
          </FormRow>

          {/* Submit Button */}
          <FormRow>
            <Button content={"Apply Filters"} />
          </FormRow>

          <FormRow>
            <Button
              content={"Reset Filters"}
              type={"button-primary-red"}
              handleClick={resetFilters}
            />
          </FormRow>
        </form>
      </div>
    </div>
  );
}

export default FilterSection;
