import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[24px] border border-neutral-200 bg-[#F7F7F5] px-8 py-16 text-center">
      <h3 className="font-editorial text-3xl font-normal text-[#111111]">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-xs leading-relaxed text-neutral-500">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          type="button"
          variant="pill"
          size="md"
          onClick={onAction}
          className="mt-6"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
