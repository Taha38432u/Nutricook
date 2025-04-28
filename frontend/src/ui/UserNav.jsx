import { Link } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaPlusSquare,
  FaHeart,
  FaUser,
  FaAppleAlt,
} from "react-icons/fa"; // Import FaAppleAlt for nutrients

function UserNav() {
  return (
    <>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaHome />
        <Link to="/home" className="text-lg font-bold hover:text-blue-300">
          Home
        </Link>
      </li>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaBook />
        <Link to="my-recipes" className="text-lg font-bold hover:text-blue-300">
          Recipes
        </Link>
      </li>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaPlusSquare />
        <Link to="/create" className="text-lg font-bold hover:text-blue-300">
          Recipe
        </Link>
      </li>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaAppleAlt />
        <Link
          to="/check-nutrients"
          className="text-lg font-bold hover:text-blue-300"
        >
          Nutrients
        </Link>
      </li>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaHeart />
        <Link to="/liked-recipes" className="text-lg font-bold hover:text-blue-300">
          Liked
        </Link>
      </li>
      <li className="mx-4 my-6 flex items-center gap-2 md:my-0">
        <FaUser />
        <Link to="/me" className="text-lg font-bold hover:text-blue-300">
          Profile
        </Link>
      </li>
    </>
  );
}

export default UserNav;
