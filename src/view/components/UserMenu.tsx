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
    <div className={cn(
      "relative flex items-center justify-center bg-blue-200 rounded-full w-12 h-12 border border-blue-300 cursor-pointer"
    )}
    onClick={handleDropdownToggle}
    >
      <span
        className="text-sm tracking-[-0.5px] text-blue-900 font-medium"
      >
        { !title && <Spinner className="w-5 ml-2" />}
        {title}
      </span>
      <div
        className={cn(
          "z-10 hidden bg-white divide-y divide-gray-500 rounded-lg border border-gray-300 shadow w-35 absolute top-12 right-0 w-40",
          isDropdownOpen && "block"
        )}
      >
        <ul className="py-2 text-sm text-gray-800" aria-labelledby="dropdownDefaultButton">
          <li>
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100 text-center"
            >
                Profile
            </Link>
          </li>

          <li>
            <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 text-center"
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

