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
    <div className="table-wrapper overflow-x-auto">
      <table className="w-full min-w-max">
        <thead className="bg-secondary dark:bg-muted text-muted-foreground">
          <tr>
            {fields.map((field) => (
              <th
                key={field}
                className="px-4 py-2 cursor-pointer hover:underline whitespace-nowrap"
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
                <td key={field} className="px-4 py-2 whitespace-nowrap">
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
