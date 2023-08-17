import { useState } from "react";
import { Spinner } from "./Spinner";
import { cn } from "../../app/utils/cn";
import { useAuth } from "../../app/hooks/useAuth";
import { Link } from "react-router-dom";

interface UserMenuProp {
  title?: string;
}

export function UserMenu({ title }: UserMenuProp) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { signout } = useAuth();

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  }

  return (
    <div className= "relative flex items-center justify-center bg-blue-200 rounded-full w-12 h-12 border border-blue-300 cursor-pointer"
    onClick={handleDropdownToggle}
    >
      <span
        className="text-sm tracking-[-0.5px] text-blue-900 font-medium"
      >
        { !title && <Spinner className="w-5 ml-2" />}
        {title}
      </span>
      <div
        id="dropdown"
        className={cn(
          "z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-35 dark:bg-gray-600 absolute top-12 right-0",
          !isDropdownOpen && "block"
        )}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li>
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                Profile
            </Link>
          </li>

          <li>
            <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={signout}
          >
              Signout
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

