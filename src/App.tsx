// App.tsx
import { useState } from 'react';
import propertiesRaw from '../files/properties.json';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Filters from './Filters';
import CardView from './CardView';
import TableView from './TableView';

export type Property = {
  [key: string]: string | number | boolean | null;
  "Property Name": string;
  "Property Cost": number;
  "Property Fusion": string | null;
  "Property Description": string;
  "Property Items": string;
  "Property Grade": number | string | null;
  Bomb: boolean;
  Heal: boolean;
  Buff: boolean;
  Weapon: boolean;
  Armor: boolean;
  Accessory: boolean;
};

// Normalize "Property Grade" as string
const properties: Property[] = propertiesRaw.map(p => ({
  ...p,
  ["Property Grade"]: String(p["Property Grade"]),
}));

export default function App() {
  const [view, setView] = useState<'table' | 'card'>('table');
  const [filters, setFilters] = useState<Record<string, Set<string>>>({});
  const [textFilters, setTextFilters] = useState<Record<string, string>>({});
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fields = Object.keys(properties[0] || {});

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => {
      const updated = { ...prev };

      if (value === '') {
        delete updated[field];
      } else {
        updated[field] = new Set([value]);
      }

      return updated;
    });
  };

  const handleTextFilterChange = (field: string, value: string) => {
    setTextFilters(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = (items: Property[]): Property[] => {
    return items.filter(item => {
      const matchDropdowns = Object.entries(filters).every(([field, values]) => {
        const value = String(item[field]);
        return values.size === 0 || values.has(value);
      });

      const matchText = Object.entries(textFilters).every(([field, text]) => {
        return text === '' || String(item[field]).toLowerCase().includes(text.toLowerCase());
      });

      return matchDropdowns && matchText;
    });
  };

  const applySort = (items: Property[]): Property[] => {
    if (!sortField) return items;
    return [...items].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA! < valB!) return sortOrder === 'asc' ? -1 : 1;
      if (valA! > valB!) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filtered = applyFilters(properties);
  const sorted = applySort(filtered);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <Tabs
        value={view}
        onValueChange={(val) => setView(val as 'table' | 'card')}
        className="mb-4"
      >
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="table" className="flex-1 sm:flex-none">
            Table View
          </TabsTrigger>
          <TabsTrigger value="card" className="flex-1 sm:flex-none">
            Card View
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Filters
        fields={fields}
        properties={properties}
        filters={filters}
        textFilters={textFilters}
        onChange={handleFilterChange}
        onTextChange={handleTextFilterChange}
      />

      {view === 'table' ? (
        <TableView
          items={sorted}
          fields={fields}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={toggleSort}
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <label className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm font-medium">Sort By</span>
              <select
                className="border rounded p-1 w-full sm:w-auto"
                value={sortField ?? ''}
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="">None</option>
                {fields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sortOrder === 'asc'}
                onChange={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              />
              <span className="text-sm">Ascending</span>
            </label>
          </div>

          <CardView items={sorted} fields={fields} />
        </>
      )}
    </div>
  );
}
