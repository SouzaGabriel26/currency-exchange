import { ComponentProps, forwardRef, useState } from 'react';
import { cn } from '../../app/utils/cn';
import { CrossCircledIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string,
  isPassword?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, name, error, id, className, isPassword, type, ...props }, ref) => {
    const inputId = id ?? name;
    const [showPassword, setShowPassword] = useState<boolean>(false);

    function toogleShowPassword() {
      setShowPassword((prevState) => !prevState);
    }

    return (
      <div className="relative">

        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          className={cn(
            "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 outline-none peer placeholder-shown:pt-0 focus:border-gray-800 transition-all",
            error && '!border-red-600',
            className
          )}
          placeholder=" "
          type={showPassword ? "text" : type}
        />

        {
          isPassword && (
            <button
              onClick={toogleShowPassword}
              type="button"
              className="absolute top-5 right-4"
            >
              { showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
          )
        }

        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-1 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>

        {
          error && (
            <div className="flex gap-2 items-end mt-1 text-red-600">
              <CrossCircledIcon />
              <span className="text-xs">{error}</span>
            </div>
          )
        }

      </div>
    )
  }
);

Input.displayName  = 'Input';
