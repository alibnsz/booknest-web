import type { BookStatus } from '../../interfaces/book';
import { Badge } from '../ui/Badge';

interface StatusBadgeProps {
  status: BookStatus;
  borrowedBy?: string | null;
  className?: string;
}

export function StatusBadge({
  status,
  borrowedBy,
  className = '',
}: StatusBadgeProps) {
  if (status === 'borrowed') {
    return (
      <Badge variant="warning" className={className}>
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
        <span>Borrowed{borrowedBy ? ` · ${borrowedBy}` : ''}</span>
      </Badge>
    );
  }

  return (
    <Badge variant="success" className={className}>
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
      <span>Available</span>
    </Badge>
  );
}
