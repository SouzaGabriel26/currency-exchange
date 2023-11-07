import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/hooks/useAuth";
import { Spinner } from "./Spinner";

interface UserMenuProps {
  title?: string;
}

export function UserMenuDropDown({ title }: UserMenuProps) {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") ?? "light"
  );
  const { signout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="outline-none flex w-12 h-12">
        <span className="rounded-full bg-blue-200 w-full h-full text-sm tracking-[-0.5px] text-blue-900 font-medium flex justify-center items-center">
          {!title && <Spinner className="w-5 ml-2" />}
          {title}
        </span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white border border-gray-100 data-[side=bottom]:animate-slideDownAndFade rounded-xl mr-4 min-w-[150px]">
          <DropdownMenu.Item
            asChild
            onSelect={() => navigate("/profile")}
            className="cursor-pointer outline-none data-[highlighted]:bg-gray-200"
          >
            <span className="block px-4 py-2 hover:bg-gray-200 text-center rounded-xl">
              Profile
            </span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            asChild
            onSelect={signout}
            className="cursor-pointer outline-none data-[highlighted]:bg-gray-200"
          >
            <span className="block px-4 py-2 hover:bg-gray-200 text-center rounded-xl">
              Signout
            </span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            asChild
            onSelect={toggleTheme}
            className="cursor-pointer outline-none data-[highlighted]:bg-gray-200 "
          >
            <span className="block px-4 py-2 hover:bg-gray-200 text-center rounded-xl">
              Toggle theme {theme === "dark" ? "🌞" : "🌚"}
            </span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
