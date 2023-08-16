import { ComponentProps } from 'react';
import { cn } from '../../app/utils/cn';
import { Spinner } from './Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
}

export function Button({ className, isLoading, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        "bg-blue-500 hover:bg-blue-400 disabled:bg-blue-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all px-6 h-12 rounded-2xl font-bold text-white flex items-center justify-center",
        className
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6"/>}
    </button>
  )
}
