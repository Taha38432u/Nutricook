import {
  FaBreadSlice,
  FaCandyCane,
  FaDrumstickBite,
  FaFire,
  FaHeartbeat,
  FaLeaf,
  FaSeedling,
  FaTint,
} from "react-icons/fa";

function NutrientItem({ data }) {
  return (
    <div className="mb-6 rounded-2xl bg-gray-900 bg-opacity-55 p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-bold">{data.name}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <FaFire className="text-red-400" />
          <span>Calories: {Number(data.calories).toFixed(2)}</span>
        </div>
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <FaDrumstickBite className="text-yellow-400" />
          <span>Protein: {Number(data.protein).toFixed(2)} g</span>
        </div>
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <FaLeaf className="text-green-400" />
          <span>Fat: {Number(data.fat).toFixed(2)} g</span>
        </div>
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <FaBreadSlice className="text-blue-400" />
          <span>Carbohydrates: {Number(data.carbohydrates).toFixed(2)} g</span>
        </div>
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <FaTint className="text-blue-200" />
          <span>Sodium: {Number(data.vitamins.sodium).toFixed(2)} mg</span>
        </div>
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <FaHeartbeat className="text-pink-400" />
          <span>
            Potassium: {Number(data.vitamins.potassium).toFixed(2)} mg
          </span>
        </div>
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <FaLeaf className="text-green-300" />
          <span>
            Cholesterol: {Number(data.vitamins.cholesterol).toFixed(2)} mg
          </span>
        </div>
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <FaSeedling className="text-green-500" />
          <span>Fiber: {Number(data.vitamins.fiber).toFixed(2)} g</span>
        </div>
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <FaCandyCane className="text-red-300" />
          <span>Sugar: {Number(data.vitamins.sugar).toFixed(2)} g</span>
        </div>
      </div>
    </div>
  );
}

export default NutrientItem;
