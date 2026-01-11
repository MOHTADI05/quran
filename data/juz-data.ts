// Juz and Hizb divisions data
// This maps each juz/hizb to its surahs and ayah ranges

export interface JuzInfo {
  juz: number;
  startSurah: number;
  startAyah: number;
  endSurah: number;
  endAyah: number;
  surahs: Array<{
    surahNumber: number;
    startAyah: number;
    endAyah: number;
  }>;
}

export interface HizbInfo {
  hizb: number;
  juz: number;
  startSurah: number;
  startAyah: number;
  endSurah: number;
  endAyah: number;
  surahs: Array<{
    surahNumber: number;
    startAyah: number;
    endAyah: number;
  }>;
}

// Juz divisions (30 juz)
export const juzData: JuzInfo[] = [
  { juz: 1, startSurah: 1, startAyah: 1, endSurah: 2, endAyah: 141, surahs: [
    { surahNumber: 1, startAyah: 1, endAyah: 7 },
    { surahNumber: 2, startAyah: 1, endAyah: 141 },
  ]},
  { juz: 2, startSurah: 2, startAyah: 142, endSurah: 2, endAyah: 252, surahs: [
    { surahNumber: 2, startAyah: 142, endAyah: 252 },
  ]},
  { juz: 3, startSurah: 2, startAyah: 253, endSurah: 3, endAyah: 92, surahs: [
    { surahNumber: 2, startAyah: 253, endAyah: 286 },
    { surahNumber: 3, startAyah: 1, endAyah: 92 },
  ]},
  { juz: 4, startSurah: 3, startAyah: 93, endSurah: 4, endAyah: 23, surahs: [
    { surahNumber: 3, startAyah: 93, endAyah: 200 },
    { surahNumber: 4, startAyah: 1, endAyah: 23 },
  ]},
  { juz: 5, startSurah: 4, startAyah: 24, endSurah: 4, endAyah: 147, surahs: [
    { surahNumber: 4, startAyah: 24, endAyah: 147 },
  ]},
  { juz: 6, startSurah: 4, startAyah: 148, endSurah: 5, endAyah: 81, surahs: [
    { surahNumber: 4, startAyah: 148, endAyah: 176 },
    { surahNumber: 5, startAyah: 1, endAyah: 81 },
  ]},
  { juz: 7, startSurah: 5, startAyah: 82, endSurah: 6, endAyah: 110, surahs: [
    { surahNumber: 5, startAyah: 82, endAyah: 120 },
    { surahNumber: 6, startAyah: 1, endAyah: 110 },
  ]},
  { juz: 8, startSurah: 6, startAyah: 111, endSurah: 7, endAyah: 87, surahs: [
    { surahNumber: 6, startAyah: 111, endAyah: 165 },
    { surahNumber: 7, startAyah: 1, endAyah: 87 },
  ]},
  { juz: 9, startSurah: 7, startAyah: 88, endSurah: 8, endAyah: 40, surahs: [
    { surahNumber: 7, startAyah: 88, endAyah: 206 },
    { surahNumber: 8, startAyah: 1, endAyah: 40 },
  ]},
  { juz: 10, startSurah: 8, startAyah: 41, endSurah: 9, endAyah: 92, surahs: [
    { surahNumber: 8, startAyah: 41, endAyah: 75 },
    { surahNumber: 9, startAyah: 1, endAyah: 92 },
  ]},
  { juz: 11, startSurah: 9, startAyah: 93, endSurah: 11, endAyah: 5, surahs: [
    { surahNumber: 9, startAyah: 93, endAyah: 129 },
    { surahNumber: 10, startAyah: 1, endAyah: 109 },
    { surahNumber: 11, startAyah: 1, endAyah: 5 },
  ]},
  { juz: 12, startSurah: 11, startAyah: 6, endSurah: 12, endAyah: 52, surahs: [
    { surahNumber: 11, startAyah: 6, endAyah: 123 },
    { surahNumber: 12, startAyah: 1, endAyah: 52 },
  ]},
  { juz: 13, startSurah: 12, startAyah: 53, endSurah: 14, endAyah: 52, surahs: [
    { surahNumber: 12, startAyah: 53, endAyah: 111 },
    { surahNumber: 13, startAyah: 1, endAyah: 43 },
    { surahNumber: 14, startAyah: 1, endAyah: 52 },
  ]},
  { juz: 14, startSurah: 15, startAyah: 1, endSurah: 16, endAyah: 128, surahs: [
    { surahNumber: 15, startAyah: 1, endAyah: 99 },
    { surahNumber: 16, startAyah: 1, endAyah: 128 },
  ]},
  { juz: 15, startSurah: 17, startAyah: 1, endSurah: 18, endAyah: 74, surahs: [
    { surahNumber: 17, startAyah: 1, endAyah: 111 },
    { surahNumber: 18, startAyah: 1, endAyah: 74 },
  ]},
  { juz: 16, startSurah: 18, startAyah: 75, endSurah: 20, endAyah: 135, surahs: [
    { surahNumber: 18, startAyah: 75, endAyah: 110 },
    { surahNumber: 19, startAyah: 1, endAyah: 98 },
    { surahNumber: 20, startAyah: 1, endAyah: 135 },
  ]},
  { juz: 17, startSurah: 21, startAyah: 1, endSurah: 22, endAyah: 78, surahs: [
    { surahNumber: 21, startAyah: 1, endAyah: 112 },
    { surahNumber: 22, startAyah: 1, endAyah: 78 },
  ]},
  { juz: 18, startSurah: 23, startAyah: 1, endSurah: 25, endAyah: 20, surahs: [
    { surahNumber: 23, startAyah: 1, endAyah: 118 },
    { surahNumber: 24, startAyah: 1, endAyah: 64 },
    { surahNumber: 25, startAyah: 1, endAyah: 20 },
  ]},
  { juz: 19, startSurah: 25, startAyah: 21, endSurah: 27, endAyah: 55, surahs: [
    { surahNumber: 25, startAyah: 21, endAyah: 77 },
    { surahNumber: 26, startAyah: 1, endAyah: 227 },
    { surahNumber: 27, startAyah: 1, endAyah: 55 },
  ]},
  { juz: 20, startSurah: 27, startAyah: 56, endSurah: 29, endAyah: 45, surahs: [
    { surahNumber: 27, startAyah: 56, endAyah: 93 },
    { surahNumber: 28, startAyah: 1, endAyah: 88 },
    { surahNumber: 29, startAyah: 1, endAyah: 45 },
  ]},
  { juz: 21, startSurah: 29, startAyah: 46, endSurah: 33, endAyah: 30, surahs: [
    { surahNumber: 29, startAyah: 46, endAyah: 69 },
    { surahNumber: 30, startAyah: 1, endAyah: 60 },
    { surahNumber: 31, startAyah: 1, endAyah: 34 },
    { surahNumber: 32, startAyah: 1, endAyah: 30 },
    { surahNumber: 33, startAyah: 1, endAyah: 30 },
  ]},
  { juz: 22, startSurah: 33, startAyah: 31, endSurah: 36, endAyah: 27, surahs: [
    { surahNumber: 33, startAyah: 31, endAyah: 73 },
    { surahNumber: 34, startAyah: 1, endAyah: 54 },
    { surahNumber: 35, startAyah: 1, endAyah: 45 },
    { surahNumber: 36, startAyah: 1, endAyah: 27 },
  ]},
  { juz: 23, startSurah: 36, startAyah: 28, endSurah: 39, endAyah: 31, surahs: [
    { surahNumber: 36, startAyah: 28, endAyah: 83 },
    { surahNumber: 37, startAyah: 1, endAyah: 182 },
    { surahNumber: 38, startAyah: 1, endAyah: 88 },
    { surahNumber: 39, startAyah: 1, endAyah: 31 },
  ]},
  { juz: 24, startSurah: 39, startAyah: 32, endSurah: 41, endAyah: 46, surahs: [
    { surahNumber: 39, startAyah: 32, endAyah: 75 },
    { surahNumber: 40, startAyah: 1, endAyah: 85 },
    { surahNumber: 41, startAyah: 1, endAyah: 46 },
  ]},
  { juz: 25, startSurah: 41, startAyah: 47, endSurah: 45, endAyah: 37, surahs: [
    { surahNumber: 41, startAyah: 47, endAyah: 54 },
    { surahNumber: 42, startAyah: 1, endAyah: 53 },
    { surahNumber: 43, startAyah: 1, endAyah: 89 },
    { surahNumber: 44, startAyah: 1, endAyah: 59 },
    { surahNumber: 45, startAyah: 1, endAyah: 37 },
  ]},
  { juz: 26, startSurah: 46, startAyah: 1, endSurah: 51, endAyah: 30, surahs: [
    { surahNumber: 46, startAyah: 1, endAyah: 35 },
    { surahNumber: 47, startAyah: 1, endAyah: 38 },
    { surahNumber: 48, startAyah: 1, endAyah: 29 },
    { surahNumber: 49, startAyah: 1, endAyah: 18 },
    { surahNumber: 50, startAyah: 1, endAyah: 45 },
    { surahNumber: 51, startAyah: 1, endAyah: 30 },
  ]},
  { juz: 27, startSurah: 51, startAyah: 31, endSurah: 57, endAyah: 29, surahs: [
    { surahNumber: 51, startAyah: 31, endAyah: 60 },
    { surahNumber: 52, startAyah: 1, endAyah: 49 },
    { surahNumber: 53, startAyah: 1, endAyah: 62 },
    { surahNumber: 54, startAyah: 1, endAyah: 55 },
    { surahNumber: 55, startAyah: 1, endAyah: 78 },
    { surahNumber: 56, startAyah: 1, endAyah: 96 },
    { surahNumber: 57, startAyah: 1, endAyah: 29 },
  ]},
  { juz: 28, startSurah: 58, startAyah: 1, endSurah: 66, endAyah: 12, surahs: [
    { surahNumber: 58, startAyah: 1, endAyah: 22 },
    { surahNumber: 59, startAyah: 1, endAyah: 24 },
    { surahNumber: 60, startAyah: 1, endAyah: 13 },
    { surahNumber: 61, startAyah: 1, endAyah: 14 },
    { surahNumber: 62, startAyah: 1, endAyah: 11 },
    { surahNumber: 63, startAyah: 1, endAyah: 11 },
    { surahNumber: 64, startAyah: 1, endAyah: 18 },
    { surahNumber: 65, startAyah: 1, endAyah: 12 },
    { surahNumber: 66, startAyah: 1, endAyah: 12 },
  ]},
  { juz: 29, startSurah: 67, startAyah: 1, endSurah: 77, endAyah: 50, surahs: [
    { surahNumber: 67, startAyah: 1, endAyah: 30 },
    { surahNumber: 68, startAyah: 1, endAyah: 52 },
    { surahNumber: 69, startAyah: 1, endAyah: 52 },
    { surahNumber: 70, startAyah: 1, endAyah: 44 },
    { surahNumber: 71, startAyah: 1, endAyah: 28 },
    { surahNumber: 72, startAyah: 1, endAyah: 28 },
    { surahNumber: 73, startAyah: 1, endAyah: 20 },
    { surahNumber: 74, startAyah: 1, endAyah: 56 },
    { surahNumber: 75, startAyah: 1, endAyah: 40 },
    { surahNumber: 76, startAyah: 1, endAyah: 31 },
    { surahNumber: 77, startAyah: 1, endAyah: 50 },
  ]},
  { juz: 30, startSurah: 78, startAyah: 1, endSurah: 114, endAyah: 6, surahs: [
    { surahNumber: 78, startAyah: 1, endAyah: 40 },
    { surahNumber: 79, startAyah: 1, endAyah: 46 },
    { surahNumber: 80, startAyah: 1, endAyah: 42 },
    { surahNumber: 81, startAyah: 1, endAyah: 29 },
    { surahNumber: 82, startAyah: 1, endAyah: 19 },
    { surahNumber: 83, startAyah: 1, endAyah: 36 },
    { surahNumber: 84, startAyah: 1, endAyah: 25 },
    { surahNumber: 85, startAyah: 1, endAyah: 22 },
    { surahNumber: 86, startAyah: 1, endAyah: 17 },
    { surahNumber: 87, startAyah: 1, endAyah: 19 },
    { surahNumber: 88, startAyah: 1, endAyah: 26 },
    { surahNumber: 89, startAyah: 1, endAyah: 30 },
    { surahNumber: 90, startAyah: 1, endAyah: 20 },
    { surahNumber: 91, startAyah: 1, endAyah: 15 },
    { surahNumber: 92, startAyah: 1, endAyah: 21 },
    { surahNumber: 93, startAyah: 1, endAyah: 11 },
    { surahNumber: 94, startAyah: 1, endAyah: 8 },
    { surahNumber: 95, startAyah: 1, endAyah: 8 },
    { surahNumber: 96, startAyah: 1, endAyah: 19 },
    { surahNumber: 97, startAyah: 1, endAyah: 5 },
    { surahNumber: 98, startAyah: 1, endAyah: 8 },
    { surahNumber: 99, startAyah: 1, endAyah: 8 },
    { surahNumber: 100, startAyah: 1, endAyah: 11 },
    { surahNumber: 101, startAyah: 1, endAyah: 11 },
    { surahNumber: 102, startAyah: 1, endAyah: 8 },
    { surahNumber: 103, startAyah: 1, endAyah: 3 },
    { surahNumber: 104, startAyah: 1, endAyah: 9 },
    { surahNumber: 105, startAyah: 1, endAyah: 5 },
    { surahNumber: 106, startAyah: 1, endAyah: 4 },
    { surahNumber: 107, startAyah: 1, endAyah: 7 },
    { surahNumber: 108, startAyah: 1, endAyah: 3 },
    { surahNumber: 109, startAyah: 1, endAyah: 6 },
    { surahNumber: 110, startAyah: 1, endAyah: 3 },
    { surahNumber: 111, startAyah: 1, endAyah: 5 },
    { surahNumber: 112, startAyah: 1, endAyah: 4 },
    { surahNumber: 113, startAyah: 1, endAyah: 5 },
    { surahNumber: 114, startAyah: 1, endAyah: 6 },
  ]},
];

export function getJuzInfo(juzNumber: number): JuzInfo | undefined {
  return juzData.find(j => j.juz === juzNumber);
}

export function getAllJuzs(): JuzInfo[] {
  return juzData;
}

// Hizb divisions (60 hizb - each juz has 2 hizbs)
export function getHizbInfo(hizbNumber: number): HizbInfo | undefined {
  const juzNumber = Math.ceil(hizbNumber / 2);
  const juz = getJuzInfo(juzNumber);
  
  if (!juz) return undefined;

  // Each juz has 2 hizbs
  const isFirstHizb = hizbNumber % 2 === 1;
  
  if (isFirstHizb) {
    // First half of juz
    return {
      hizb: hizbNumber,
      juz: juzNumber,
      startSurah: juz.startSurah,
      startAyah: juz.startAyah,
      endSurah: juz.endSurah,
      endAyah: Math.floor((juz.startAyah + juz.endAyah) / 2),
      surahs: juz.surahs.map(s => ({
        surahNumber: s.surahNumber,
        startAyah: s.startAyah,
        endAyah: Math.floor((s.startAyah + s.endAyah) / 2),
      })),
    };
  } else {
    // Second half of juz
    return {
      hizb: hizbNumber,
      juz: juzNumber,
      startSurah: juz.startSurah,
      startAyah: Math.floor((juz.startAyah + juz.endAyah) / 2) + 1,
      endSurah: juz.endSurah,
      endAyah: juz.endAyah,
      surahs: juz.surahs.map(s => ({
        surahNumber: s.surahNumber,
        startAyah: Math.floor((s.startAyah + s.endAyah) / 2) + 1,
        endAyah: s.endAyah,
      })),
    };
  }
}

