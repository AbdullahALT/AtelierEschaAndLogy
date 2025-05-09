// Filters.tsx
import React from 'react';
import { Property } from './App';

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
          <label className="block text-sm font-medium mb-1">{field}</label>
          <input
            type="text"
            value={textFilters[field] || ''}
            onChange={e => onTextChange(field, e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder={`Search ${field}`}
          />
        </div>
      ))}

      {booleanFields.map(field => (
        <div key={field} className="flex flex-col">
          <label className="block text-sm font-medium mb-1">{field}</label>
          <select
            className="w-full border border-gray-300 rounded px-2 py-1"
            onChange={e => onChange(field, e.target.value)}
            value={Array.from(filters[field] ?? [])[0] ?? ''}
          >
            <option value="">Any</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      ))}

      {dropdownFields.map(field => (
        <div key={field} className="flex flex-col">
          <label className="block text-sm font-medium mb-1">{field}</label>
          <select
            className="w-full border border-gray-300 rounded px-2 py-1"
            onChange={e => onChange(field, e.target.value)}
            value={Array.from(filters[field] ?? [])[0] ?? ''}
          >
            <option value="">Any</option>
            {getUniqueValues(field).map(val => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
