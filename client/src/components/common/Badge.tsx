import clsx from 'clsx';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export const Badge = ({ label, variant = 'info', size = 'md' }: BadgeProps) => {
  return (
    <span className={clsx(
      'inline-flex items-center rounded-full font-medium',
      {
        'bg-green-100 text-green-800': variant === 'success',
        'bg-yellow-100 text-yellow-800': variant === 'warning',
        'bg-red-100 text-red-800': variant === 'error',
        'bg-blue-100 text-blue-800': variant === 'info',
        'px-2 py-0.5 text-xs': size === 'sm',
        'px-2.5 py-0.5 text-sm': size === 'md',
      }
    )}>
      {label}
    </span>
  );
};