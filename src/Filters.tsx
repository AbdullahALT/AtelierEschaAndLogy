// Filters.tsx
import React from 'react';
import { Property } from './App';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from './components/ui/select';
import { Input } from './components/ui/input';

type FiltersProps = {
  fields: string[];
  properties: Property[];
  filters: Record<string, Set<string>>;
  textFilters: Record<string, string>;
  onChange: (field: string, value: string) => void;
  onTextChange: (field: string, value: string) => void;
};

const booleanFields = ['Bomb', 'Heal', 'Buff', 'Weapon', 'Armor', 'Accessory'];
const textFields = ['Property Name', 'Property Description', 'Property Items', 'Property Fusion'];
const dropdownFields = ['Property Cost', 'Property Grade'];

export default function Filters({
  fields,
  properties,
  filters,
  textFilters,
  onChange,
  onTextChange,
}: FiltersProps) {
  const getUniqueValues = (field: string): string[] => {
    const values = properties.map(p => String(p[field] ?? '')).filter(v => v !== '');
    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      {textFields.map(field => (
        <div key={field} className="flex flex-col">
          <label htmlFor={field} className="block text-sm font-medium mb-1">
            {field}
          </label>
          <Input
            id={field}
            type="text"
            value={textFilters[field] || ''}
            onChange={e => onTextChange(field, e.target.value)}
            placeholder={`Search ${field}`}
          />
        </div>
      ))}

      {booleanFields.map(field => (
        <div key={field} className="flex flex-col">
          <label htmlFor={field} className="block text-sm font-medium mb-1">
            {field}
          </label>
          <Select
            onValueChange={value => onChange(field, value === "any" ? "" : value)}
            value={Array.from(filters[field] ?? [])[0] ?? "any"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}

      {dropdownFields.map(field => (
        <div key={field} className="flex flex-col">
          <label htmlFor={field} className="block text-sm font-medium mb-1">
            {field}
          </label>
          <Select
            onValueChange={value => onChange(field, value === "any" ? "" : value)}
            value={Array.from(filters[field] ?? [])[0] ?? "any"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {getUniqueValues(field).map(val => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
