// App.tsx
import { useState } from 'react';
import propertiesRaw from '../files/properties.json';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Filters from './Filters';
import CardView from './CardView';
import TableView from './TableView';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from './components/ui/select';
import { Checkbox } from './components/ui/checkbox';
import { SortAscIcon, SortDescIcon, XIcon } from "lucide-react"; // Importing the SortAsc icon
import { Button } from './components/ui/button';


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
  const [filters, setFilters] = useState<Record<string, Set<string>>>({});
  const [textFilters, setTextFilters] = useState<Record<string, string>>({});
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fields = Object.keys(properties[0] || {});

  const toggleSort = (field: string | null) => {
    if (!field) return;

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
    <div className="p-4 w-full overflow-x-hidden">

      <Filters
        fields={fields}
        properties={properties}
        filters={filters}
        textFilters={textFilters}
        onChange={handleFilterChange}
        onTextChange={handleTextFilterChange}
      />

      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto mb-4">
        {/* label "sort by" */}
        <span className="text-sm font-medium whitespace-nowrap">Sort By:</span>

        <div className="flex flex-row w-full items-center gap-2">
          {/* Sort by dropdown */}
          <Select
            onValueChange={(value) => setSortField(value === "none" ? null : value)}
            value={sortField ?? "none"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {fields.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              setSortField(null);
              setSortOrder('asc');
            }}
            disabled={!sortField}
            type="button"
            aria-label="Clear Sort"
            title="Clear Sort"
          >
            <XIcon className="w-4" />
          </Button>
          <Button
            onClick={() => toggleSort(sortField)}
            disabled={!sortField}
          >
            {sortOrder === 'asc' ? <SortAscIcon className="w-4" /> : <SortDescIcon className="w-4" />}
          </Button>
        </div>


      </div>

      <CardView items={sorted} fields={fields} />
    </div>
  );
}
