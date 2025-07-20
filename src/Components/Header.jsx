import { useSelector } from "react-redux";
import { Bell, Search, UserCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../features/searchSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const currentTime = new Date().toLocaleString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const dispatch = useDispatch();

  return (
    <div className="w-full flex items-center justify-between bg-white shadow-md px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full w-full max-w-md">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder="Search tasks..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      <div className="flex items-center gap-6">
        <span className="text-gray-600 text-sm hidden md:block">{currentTime}</span>

        <button className="relative hover:bg-gray-100 p-2 rounded-full">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-2">
            <UserCircle className="w-6 h-6 text-gray-700" />

          <div className="hidden md:flex flex-col text-sm">
            <span className="font-medium">{currentUser?.name || "Guest"}</span>
            <span className="text-xs text-gray-500">{currentUser?.email || "user@example.com"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
