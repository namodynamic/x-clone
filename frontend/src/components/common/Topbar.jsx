import XSvg from "../svgs/X";
import { BiLogOut } from "react-icons/bi";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Topbar = () => {
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to logout");
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Failed to logout");
    },
  });

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <nav className="sticky sm:hidden top-0 z-30 flex border-r border-l border-gray-700 w-full bg-black">
      <div className="flex items-center justify-between w-full px-5 py-2">
        {authUser && (
          <Link to={`/profile/${authUser.username}`} className="">
            <div className="avatar  md:inline-flex">
              <div className="w-7 rounded-full">
                <img src={authUser?.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
          </Link>
        )}

        <Link to="/">
          <XSvg className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
        </Link>

        <BiLogOut
          className="w-7 h-7 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        />
      </div>
    </nav>
  );
};
export default Topbar;
