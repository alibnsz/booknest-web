import { useState, type FormEvent } from 'react';
import { validateBorrowedBy } from '../../utils/validators';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export interface BorrowFormProps {
  bookTitle: string;
  onSubmit: (borrowerName: string) => Promise<void> | void;
  onCancel: () => void;
}

export function BorrowForm({ bookTitle, onSubmit, onCancel }: BorrowFormProps) {
  const [borrowerName, setBorrowerName] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (value: string) => {
    setBorrowerName(value);
    if (hasSubmitted) {
      setError(validateBorrowedBy(value));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setHasSubmitted(true);

    const validationError = validateBorrowedBy(borrowerName);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(borrowerName.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <p className="text-xs text-neutral-600">
        <span className="font-semibold text-neutral-900">"{bookTitle}"</span>{' '}
        adlı eseri ödünç alan kişinin adını girin.
      </p>

      <Input
        label="Ödünç Alan Kişi"
        placeholder="Örn: Ahmet Yılmaz"
        value={borrowerName}
        onChange={(e) => handleNameChange(e.target.value)}
        error={error}
        autoFocus
      />

      <div className="mt-2 flex items-center justify-end gap-2.5">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Vazgeç
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          Ödünç Ver
        </Button>
      </div>
    </form>
  );
}
