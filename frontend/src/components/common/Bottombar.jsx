import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

const Bottombar = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="z-50 flex-between w-full sticky bottom-0 border-r border-l border-gray-700 bg-black px-5 py-2 sm:hidden">
      <ul className="flex flex-row justify-between  w-full mt-4">
        <li className="flex justify-center md:justify-start">
          <Link
            to="/"
            className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
          >
            <MdHomeFilled className="w-8 h-8" />
            <span className="text-lg hidden md:block">Home</span>
          </Link>
        </li>
        <li className="flex justify-center md:justify-start">
          <Link
            to="/notifications"
            className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
          >
            <IoNotifications className="w-6 h-6" />
            <span className="text-lg hidden md:block">Notifications</span>
          </Link>
        </li>
        <li className="flex justify-center md:justify-start">
          <Link
            to="/"
            className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
          >
            <FaSearch className="w-6 h-6" />
            <span className="text-lg hidden md:block">Notifications</span>
          </Link>
        </li>

        <li className="flex justify-center md:justify-start">
          <Link
            to={`/profile/${authUser?.username}`}
            className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
          >
            <FaUser className="w-6 h-6" />
            <span className="text-lg hidden md:block">Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Bottombar;
