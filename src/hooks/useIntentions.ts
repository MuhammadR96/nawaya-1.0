import { useState, useEffect } from 'react';
import { Category, parseIntentionsMd } from '@/lib/parseIntentions';

export function useIntentions() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/intentions.md')
      .then(res => res.text())
      .then(md => {
        setCategories(parseIntentionsMd(md));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { categories, loading };
}
