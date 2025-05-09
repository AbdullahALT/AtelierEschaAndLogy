import { ChevronDown, ChevronUp } from 'lucide-react';

type Props = {
  fields: string[];
  sortField: string | null;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
};

export default function Sort({ fields, sortField, sortOrder, onSort }: Props) {
  return (
    <div className="mb-4 flex flex-wrap gap-4">
      {fields.map(field => (
        <div
          key={field}
          className="cursor-pointer text-sm flex items-center gap-1"
          onClick={() => onSort(field)}
        >
          {field}
          {sortField === field && (sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
        </div>
      ))}
    </div>
  );
}