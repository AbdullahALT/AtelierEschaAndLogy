import { Property } from './App';
import { Badge } from '@/components/ui/badge';
import {
  BombIcon,
  ShieldIcon,
  SyringeIcon,
  SwordIcon,
  StarIcon,
  PlusCircleIcon,
  Coins, Flame, Package, Combine
} from 'lucide-react';
import { JSX } from 'react';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 p-6 flex flex-col justify-between"
        >
          {/* Header Section */}
          <div className="flex items-center mb-3">
            <span className="px-2 w-10 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-md text-yellow-700 dark:text-yellow-300 text-sm font-medium">
              <h2>{item['Property Cost']}</h2>
            </span>
            <h2 className="text-lg font-bold text-primary truncate ml-3">
              {item['Property Name']}
            </h2>
          </div>

          <p className="text-sm text-start text-muted-foreground mb-4 line-clamp-3">
            {item['Property Description']}
          </p>

          {/* Details Section */}
          <div className="space-y-2 text-sm text-foreground">

            {item['Property Fusion'] && (
              <div className="flex items-center gap-2 ">
                <Flame className="w-4 h-4 text-purple-500 " />
                <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-md px-2 py-1">
                  {item['Property Fusion']}
                </span>
              </div>
            )}

            {item['Property Items'].length > 0 && (
              <div className="flex items-start gap-2">
                <Package className="w-4 h-4 mt-1 text-sky-500 flex-none" />
                <div className="flex flex-wrap gap-2">
                  {item['Property Items'].map((itms, i) => (
                    <span
                      key={i}
                      onClick={() => window.open(itms.url, '_blank')}
                      className="bg-slate-200 dark:bg-slate-700 text-xs px-2 py-1 rounded-full text-foreground cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200"
                    >
                      {itms.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="flex flex-wrap gap-2 mt-5">
            {Object.keys(groupIcons).map((group) =>
              item[group] ? (
                <Badge
                  key={group}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 bg-background/70 dark:bg-muted text-foreground shadow-sm"
                >
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
