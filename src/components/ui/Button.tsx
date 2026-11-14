import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer';

  const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-[#111111] text-white hover:bg-neutral-800 rounded-full',
    secondary:
      'bg-white text-[#111111] border border-neutral-300 hover:border-[#111111] rounded-full',
    ghost:
      'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-[#111111] rounded-full',
    danger:
      'bg-red-600 text-white hover:bg-red-700 rounded-full',
    pill:
      'bg-white text-[#111111] border border-neutral-900 hover:bg-[#111111] hover:text-white rounded-full',
  };

  const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-xs tracking-wide',
    lg: 'px-7 py-3 text-sm tracking-wide',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <span
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
