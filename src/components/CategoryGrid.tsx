import { Category } from '@/lib/parseIntentions';
import { BookOpen } from 'lucide-react';

const categoryIcons: Record<string, string> = {
  'نوايا النوم': '🌙',
  'الصلاة': '🕌',
  'الصيام': '☪️',
  'القرآن الكريم': '📖',
  'صلة الرحم وبر الوالدين': '❤️',
  'الوضوء': '💧',
  'الزكاة والصدقة': '🤲',
  'الحج والعمرة': '🕋',
  'نوايا الاحتساب عند وقوع البلاء': '🤍',
  'مساعدة الناس': '🫂',
  'النية في ارتداء الملابس': '👔',
  'النية في الذهاب إلى العمل': '💼',
  'نوايا الزواج': '💍',
  'الأذان': '📢',
};

interface CategoryGridProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

export default function CategoryGrid({ categories, onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect(cat)}
          className="group relative flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-gold-dim transition-all duration-300 hover:glow-gold"
        >
          <span className="text-3xl">
            {categoryIcons[cat.name] || '📿'}
          </span>
          <span className="font-body text-sm font-medium text-foreground group-hover:text-gold-glow transition-colors text-center leading-relaxed">
            {cat.name}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <BookOpen className="w-3 h-3" />
            {cat.intentions.length}
          </span>
        </button>
      ))}
    </div>
  );
}
