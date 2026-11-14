export interface OpenLibraryCandidate {
  key: string;
  title: string;
  author: string;
  year: number;
  category: string;
  pages?: number;
  coverUrl?: string;
  blurb?: string;
}

interface OpenLibraryDoc {
  key?: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  subject?: string[];
  number_of_pages_median?: number;
  cover_i?: number;
  first_sentence?: string[] | string;
}

interface OpenLibrarySearchResponse {
  docs?: OpenLibraryDoc[];
}

export async function searchOpenLibraryBooks(
  query: string,
  signal?: AbortSignal,
): Promise<OpenLibraryCandidate[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const url = new URL('https://openlibrary.org/search.json');
  url.searchParams.set('q', trimmed);
  url.searchParams.set('limit', '8');
  url.searchParams.set(
    'fields',
    'key,title,author_name,first_publish_year,subject,number_of_pages_median,cover_i,first_sentence',
  );

  const response = await fetch(url.toString(), { signal });
  if (!response.ok) {
    throw new Error('Could not reach Open Library API.');
  }

  const data = (await response.json()) as OpenLibrarySearchResponse;
  const docs = data.docs ?? [];
  const currentYear = new Date().getFullYear();

  return docs
    .filter((doc) => Boolean(doc.title))
    .map((doc) => {
      const title = (doc.title ?? 'Untitled').slice(0, 200);
      const author = (doc.author_name?.[0] ?? 'Unknown Author').slice(0, 120);
      const rawYear = doc.first_publish_year ?? currentYear;
      const year =
        Number.isInteger(rawYear) && rawYear >= 0 && rawYear <= currentYear
          ? rawYear
          : currentYear;

      const rawSubject = doc.subject?.[0]?.toLowerCase() ?? 'novel';
      const category = rawSubject.slice(0, 32) || 'novel';

      const coverUrl = doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
        : undefined;

      const firstSentence = Array.isArray(doc.first_sentence)
        ? doc.first_sentence[0]
        : doc.first_sentence;

      const blurb = firstSentence
        ? `${firstSentence} — First published in ${year} by ${author}.`
        : `${title} is a work by ${author}, first published in ${year} and categorized under ${category}.`;

      return {
        key: doc.key ?? `${title}-${author}-${year}`,
        title,
        author,
        year,
        category,
        pages: doc.number_of_pages_median ?? 320,
        coverUrl,
        blurb,
      };
    });
}
