// Quran Ayahs Data
// This file contains the Arabic text of Quranic verses
// Source: Uthmani script (verified text)

export interface AyahData {
  surahNumber: number;
  ayahNumber: number;
  text: string;
}

// سورة الفاتحة (1)
export const alFatihahAyahs = [
  { surahNumber: 1, ayahNumber: 1, text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
  { surahNumber: 1, ayahNumber: 2, text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' },
  { surahNumber: 1, ayahNumber: 3, text: 'الرَّحْمَٰنِ الرَّحِيمِ' },
  { surahNumber: 1, ayahNumber: 4, text: 'مَالِكِ يَوْمِ الدِّينِ' },
  { surahNumber: 1, ayahNumber: 5, text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ' },
  { surahNumber: 1, ayahNumber: 6, text: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ' },
  { surahNumber: 1, ayahNumber: 7, text: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ' },
];

// سورة الإخلاص (112)
export const alIkhlasAyahs = [
  { surahNumber: 112, ayahNumber: 1, text: 'قُلْ هُوَ اللَّهُ أَحَدٌ' },
  { surahNumber: 112, ayahNumber: 2, text: 'اللَّهُ الصَّمَدُ' },
  { surahNumber: 112, ayahNumber: 3, text: 'لَمْ يَلِدْ وَلَمْ يُولَدْ' },
  { surahNumber: 112, ayahNumber: 4, text: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ' },
];

// سورة الفلق (113)
export const alFalaqAyahs = [
  { surahNumber: 113, ayahNumber: 1, text: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ' },
  { surahNumber: 113, ayahNumber: 2, text: 'مِن شَرِّ مَا خَلَقَ' },
  { surahNumber: 113, ayahNumber: 3, text: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ' },
  { surahNumber: 113, ayahNumber: 4, text: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ' },
  { surahNumber: 113, ayahNumber: 5, text: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ' },
];

// سورة الناس (114)
export const anNasAyahs = [
  { surahNumber: 114, ayahNumber: 1, text: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ' },
  { surahNumber: 114, ayahNumber: 2, text: 'مَلِكِ النَّاسِ' },
  { surahNumber: 114, ayahNumber: 3, text: 'إِلَٰهِ النَّاسِ' },
  { surahNumber: 114, ayahNumber: 4, text: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ' },
  { surahNumber: 114, ayahNumber: 5, text: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ' },
  { surahNumber: 114, ayahNumber: 6, text: 'مِنَ الْجِنَّةِ وَالنَّاسِ' },
];

// Function to get ayahs for a surah
export function getAyahsForSurah(surahNumber: number): AyahData[] {
  switch (surahNumber) {
    case 1:
      return alFatihahAyahs;
    case 112:
      return alIkhlasAyahs;
    case 113:
      return alFalaqAyahs;
    case 114:
      return anNasAyahs;
    default:
      return [];
  }
}

// Note: To add more surahs, import verified Quran text from a reliable source
// Recommended sources: Tanzil.net, King Fahd Complex

