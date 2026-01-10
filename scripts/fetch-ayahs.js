// Script to fetch all Quran ayahs from Alquran.cloud API
// Run: node scripts/fetch-ayahs.js

const fs = require('fs');
const path = require('path');

async function fetchAyahsForSurah(surahNumber) {
  try {
    // Using Alquran.cloud API with Uthmani script
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.uthmani`);
    const data = await response.json();
    
    if (data.code === 200 && data.data) {
      return data.data.ayahs.map(ayah => ({
        number: ayah.numberInSurah,
        text: ayah.text
      }));
    }
    return [];
  } catch (error) {
    console.error(`Error fetching surah ${surahNumber}:`, error);
    return [];
  }
}

async function fetchAllAyahs() {
  const allAyahs = {};
  
  console.log('Fetching all Quran ayahs...');
  
  for (let i = 1; i <= 114; i++) {
    console.log(`Fetching surah ${i}...`);
    const ayahs = await fetchAyahsForSurah(i);
    allAyahs[i] = ayahs;
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Save to JSON file
  const outputPath = path.join(__dirname, '../data/all-ayahs.json');
  fs.writeFileSync(outputPath, JSON.stringify(allAyahs, null, 2), 'utf8');
  
  console.log(`\n✅ All ayahs fetched and saved to ${outputPath}`);
  console.log(`Total surahs: ${Object.keys(allAyahs).length}`);
}

// Run if executed directly
if (require.main === module) {
  fetchAllAyahs().catch(console.error);
}

module.exports = { fetchAyahsForSurah, fetchAllAyahs };

