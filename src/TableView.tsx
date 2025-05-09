import { Property } from './App';

export default function TableView({
  items,
  fields,
  sortField,
  sortOrder,
  onSort,
}: {
  items: Property[];
  fields: string[];
  sortField: string | null;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}) {
  return (
    <div className="overflow-auto border rounded-lg shadow bg-white dark:bg-card">
      <table className="w-full table-auto text-sm text-left border-collapse">
        <thead className="bg-secondary dark:bg-muted text-muted-foreground">
          <tr>
            {fields.map((field) => (
              <th
                key={field}
                className="px-4 py-2 cursor-pointer hover:underline"
                onClick={() => onSort(field)}
              >
                {field}
                {sortField === field ? (sortOrder === 'asc' ? ' 🔼' : ' 🔽') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-t hover:bg-secondary/50">
              {fields.map((field) => (
                <td key={field} className="px-4 py-2">
                  {String(item[field] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
