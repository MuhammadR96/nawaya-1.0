import { Category } from '@/lib/parseIntentions';
import { ArrowRight, BookOpen } from 'lucide-react';

interface IntentionsListProps {
  category: Category;
  onBack: () => void;
}

export default function IntentionsList({ category, onBack }: IntentionsListProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm"
      >
        <ArrowRight className="w-4 h-4" />
        العودة للتصنيفات
      </button>

      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl text-gold">{category.name}</h2>
        <div className="divider-gold mx-auto max-w-[200px]" />
      </div>

      <div className="space-y-4">
        {category.intentions.map((intention, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-card border border-border hover:border-gold-dim transition-all duration-300 space-y-3"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs text-gold font-medium">
                {idx + 1}
              </span>
              <h3 className="font-body text-base font-semibold text-foreground leading-relaxed">
                {intention.title}
              </h3>
            </div>

            <p className="text-sm text-secondary-foreground leading-loose pr-10">
              {intention.text}
            </p>

            <div className="flex items-center gap-2 pr-10">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                  intention.sourceType === 'آية'
                    ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/50'
                    : 'bg-amber-950/50 text-amber-400 border border-amber-800/50'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                {intention.sourceType}
              </span>
              <span className="text-xs text-muted-foreground">
                {intention.source}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
