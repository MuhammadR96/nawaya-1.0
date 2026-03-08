import { useState } from 'react';
import { useIntentions } from '@/hooks/useIntentions';
import { Category } from '@/lib/parseIntentions';
import CategoryGrid from '@/components/CategoryGrid';
import IntentionsList from '@/components/IntentionsList';

const Index = () => {
  const { categories, loading } = useIntentions();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1
            className="font-display text-2xl text-gold cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            نوايا
          </h1>
          <p className="text-xs text-muted-foreground">إنما الأعمال بالنيات</p>
        </div>
      </header>

      {/* Hero - only on home */}
      {!selectedCategory && (
        <section className="container max-w-4xl mx-auto px-4 py-12 text-center space-y-4">
          <h2 className="font-display text-4xl md:text-5xl text-gold leading-tight">
            إنما الأعمال بالنيات
          </h2>
          <div className="divider-gold mx-auto max-w-[300px]" />
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            النية أمرها عظيم، وهي روح الأعمال، وبها صلاح الأعمال. اختر تصنيفاً لاستعراض النوايا.
          </p>
        </section>
      )}

      {/* Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : selectedCategory ? (
          <IntentionsList
            category={selectedCategory}
            onBack={() => setSelectedCategory(null)}
          />
        ) : (
          <CategoryGrid categories={categories} onSelect={setSelectedCategory} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            يمكنك تعديل النوايا عبر ملف{' '}
            <code className="text-gold text-[10px] bg-secondary px-1.5 py-0.5 rounded">
              public/intentions.md
            </code>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
