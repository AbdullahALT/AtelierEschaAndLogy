// App.tsx
import { useState, useEffect } from 'react';
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
import { SortAscIcon, SortDescIcon, XIcon, MoonIcon, SunIcon } from "lucide-react"; // Importing icons
import { Button } from './components/ui/button';

export type PropertyItem = {
  name: string;
  url: string;
};

export type Property = {
  [key: string]: string | number | boolean | null | PropertyItem[];
  "Property Name": string;
  "Property Cost": number;
  "Property Fusion": string | null;
  "Property Description": string;
  "Property Items": PropertyItem[];
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

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
    <div className={`p-4 w-full overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Atelier Escha and Logy</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <SunIcon className="w-5 h-5 text-yellow-500" /> : <MoonIcon className="w-5 h-5 text-gray-700" />}
        </button>
      </div>

      <Filters
        fields={fields}
        properties={properties}
        filters={filters}
        textFilters={textFilters}
        sortField={sortField}
        sortOrder={sortOrder}
        onChange={handleFilterChange}
        onTextChange={handleTextFilterChange}
        onSortFieldChange={setSortField}
        onSortOrderToggle={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        onClearSort={() => {
          setSortField(null);
          setSortOrder('asc');
        }}
      />

      <CardView items={sorted} fields={fields} />
    </div>
  );
}
