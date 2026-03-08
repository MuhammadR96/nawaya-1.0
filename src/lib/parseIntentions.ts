export interface Intention {
  title: string;
  text: string;
  source: string;
  sourceType: 'حديث' | 'آية';
}

export interface Category {
  name: string;
  intentions: Intention[];
}

export function parseIntentionsMd(markdown: string): Category[] {
  const categories: Category[] = [];
  const lines = markdown.split('\n');

  let currentCategory: Category | null = null;
  let currentIntention: Partial<Intention> | null = null;
  let textBuffer: string[] = [];

  const flushIntention = () => {
    if (currentIntention && currentCategory && currentIntention.title) {
      currentIntention.text = textBuffer.join('\n').trim();
      if (!currentIntention.source) currentIntention.source = '';
      if (!currentIntention.sourceType) currentIntention.sourceType = 'حديث';
      currentCategory.intentions.push(currentIntention as Intention);
    }
    currentIntention = null;
    textBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Category header (## )
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      flushIntention();
      if (currentCategory && currentCategory.intentions.length > 0) {
        categories.push(currentCategory);
      }
      currentCategory = { name: trimmed.slice(3).trim(), intentions: [] };
      continue;
    }

    // Intention header (### )
    if (trimmed.startsWith('### ')) {
      flushIntention();
      currentIntention = { title: trimmed.slice(4).trim() };
      continue;
    }

    // Source line (> )
    if (trimmed.startsWith('> ') && currentIntention) {
      const sourceText = trimmed.slice(2).trim();
      currentIntention.source = sourceText;
      currentIntention.sourceType = sourceText.includes('آية') ? 'آية' : 'حديث';
      continue;
    }

    // Regular text
    if (currentIntention && trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---') && !trimmed.startsWith('>')) {
      textBuffer.push(trimmed);
    }
  }

  // Flush last
  flushIntention();
  if (currentCategory && currentCategory.intentions.length > 0) {
    categories.push(currentCategory);
  }

  return categories;
}
