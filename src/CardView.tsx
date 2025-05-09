import { Property } from './App';
import { Badge } from '@/components/ui/badge';
import {
  BombIcon,
  ShieldIcon,
  SyringeIcon,
  SwordIcon,
  StarIcon,
  PlusCircleIcon
} from 'lucide-react';

const groupIcons: Record<string, JSX.Element> = {
  Bomb: <BombIcon className="w-4 h-4 text-red-500" />,
  Heal: <SyringeIcon className="w-4 h-4 text-green-500" />,
  Buff: <StarIcon className="w-4 h-4 text-yellow-500" />,
  Weapon: <SwordIcon className="w-4 h-4 text-blue-500" />,
  Armor: <ShieldIcon className="w-4 h-4 text-purple-500" />,
  Accessory: <PlusCircleIcon className="w-4 h-4 text-pink-500" />,
};

export default function CardView({
  items,
  fields,
}: {
  items: Property[];
  fields: string[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-xl shadow-lg bg-white dark:bg-card p-4 border border-border"
        >
          <h2 className="text-xl font-semibold text-primary mb-1">
            {item['Property Name']}
          </h2>
          <p className="text-muted-foreground mb-2">
            {item['Property Description']}
          </p>
          <div className="text-sm text-foreground mb-1">
            <strong>Cost:</strong> {item['Property Cost']}
          </div>
          {item['Property Fusion']? (
            <div className="text-sm text-foreground mb-1">
            <strong>Fusion:</strong> {item['Property Fusion'] || 'N/A'}
          </div>
          ): <div></div>}
          {item['Property Items']? (
            <div className="text-sm text-foreground mt-2">
            <strong>Items:</strong> {item['Property Items'] || 'None'}
          </div>
          ): <div></div>}
          <div className="flex flex-wrap gap-1 my-2">
            {Object.keys(groupIcons).map((group) =>
              item[group] ? (
                <Badge key={group} variant="outline" className="flex items-center gap-1 px-2 py-1 text-xs">
                  {groupIcons[group]}
                  {group}
                </Badge>
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
