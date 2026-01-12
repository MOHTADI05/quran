// Search API for Quran ayahs
// Using Alquran.cloud search API

export interface SearchResult {
  surahNumber: number;
  surahName: string;
  surahNameArabic: string;
  ayahNumber: number;
  ayahText: string;
  text: string; // Full text for highlighting
}

const API_BASE = 'https://api.alquran.cloud/v1';

/**
 * Search for ayahs containing the query text
 * @param query - Search query
 * @returns Array of search results
 */
export async function searchAyahs(query: string): Promise<SearchResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    // Search in Arabic text
    const response = await fetch(
      `${API_BASE}/search/${encodeURIComponent(query)}/ar.uthmani/all`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to search ayahs');
    }

    const data = await response.json();

    if (data.code === 200 && data.data && data.data.matches) {
      const results: SearchResult[] = data.data.matches.map((match: any) => ({
        surahNumber: match.surah.number,
        surahName: match.surah.englishName,
        surahNameArabic: match.surah.name,
        ayahNumber: match.numberInSurah,
        ayahText: match.text,
        text: match.text,
      }));

      return results;
    }

    return [];
  } catch (error) {
    console.error('Error searching ayahs:', error);
    return [];
  }
}

/**
 * Search ayahs in a specific surah
 * @param query - Search query
 * @param surahNumber - Surah number (1-114)
 * @returns Array of search results
 */
export async function searchAyahsInSurah(
  query: string,
  surahNumber: number
): Promise<SearchResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const response = await fetch(
      `${API_BASE}/search/${encodeURIComponent(query)}/ar.uthmani/${surahNumber}`,
      {
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to search ayahs in surah');
    }

    const data = await response.json();

    if (data.code === 200 && data.data && data.data.matches) {
      const results: SearchResult[] = data.data.matches.map((match: any) => ({
        surahNumber: match.surah.number,
        surahName: match.surah.englishName,
        surahNameArabic: match.surah.name,
        ayahNumber: match.numberInSurah,
        ayahText: match.text,
        text: match.text,
      }));

      return results;
    }

    return [];
  } catch (error) {
    console.error('Error searching ayahs in surah:', error);
    return [];
  }
}

