// Quran API utility to fetch ayahs dynamically
// Using Alquran.cloud API (free and reliable)

export interface Ayah {
  number: number;
  text: string;
}

export interface SurahAyahs {
  surahNumber: number;
  ayahs: Ayah[];
}

const API_BASE = 'https://api.alquran.cloud/v1';

// Cache for fetched ayahs
const ayahsCache: Map<number, Ayah[]> = new Map();

/**
 * Fetch ayahs for a specific surah
 * @param surahNumber - Surah number (1-114)
 * @param useCache - Whether to use cache (default: true)
 * @returns Array of ayahs
 */
export async function fetchAyahsForSurah(
  surahNumber: number,
  useCache: boolean = true
): Promise<Ayah[]> {
  // Check cache first
  if (useCache && ayahsCache.has(surahNumber)) {
    return ayahsCache.get(surahNumber)!;
  }

  try {
    // Fetch from API using Uthmani script
    const response = await fetch(`${API_BASE}/surah/${surahNumber}/ar.uthmani`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch surah ${surahNumber}`);
    }

    const data = await response.json();

    if (data.code === 200 && data.data && data.data.ayahs) {
      const ayahs: Ayah[] = data.data.ayahs.map((ayah: any) => ({
        number: ayah.numberInSurah,
        text: ayah.text
      }));

      // Cache the result
      if (useCache) {
        ayahsCache.set(surahNumber, ayahs);
      }

      return ayahs;
    }

    return [];
  } catch (error) {
    console.error(`Error fetching ayahs for surah ${surahNumber}:`, error);
    return [];
  }
}

/**
 * Fetch ayahs for multiple surahs
 * @param surahNumbers - Array of surah numbers
 * @returns Map of surah number to ayahs
 */
export async function fetchAyahsForSurahs(
  surahNumbers: number[]
): Promise<Map<number, Ayah[]>> {
  const results = new Map<number, Ayah[]>();

  await Promise.all(
    surahNumbers.map(async (surahNumber) => {
      const ayahs = await fetchAyahsForSurah(surahNumber);
      results.set(surahNumber, ayahs);
    })
  );

  return results;
}

