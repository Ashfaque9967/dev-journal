const STORAGE_KEY = "devjournal_entries";

export function getEntries() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveEntry(entry) {
  const entries = getEntries();
  const existing = entries.findIndex((e) => e.id === entry.id);

  if (existing !== -1) {
    entries[existing] = entry;
  } else {
    entries.unshift(entry);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function deleteEntry(id) {
  const entries = getEntries();
  const filtered = entries.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function getStreak(entries) {
  if (entries.length === 0) return 0;

  const dates = entries.map((e) =>
    new Date(e.date).toLocaleDateString("en-CA"),
  );
  const uniqueDates = [...new Set(dates)].sort().reverse();

  let streak = 0;
  const today = new Date().toLocaleDateString("en-CA");
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("en-CA");

  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0;

  for (let i = 0; i < uniqueDates.length; i++) {
    const expected = new Date(Date.now() - i * 86400000).toLocaleDateString(
      "en-CA",
    );
    if (uniqueDates[i] === expected) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function getHeatmapData(entries) {
  const counts = {};

  entries.forEach((entry) => {
    const date = new Date(entry.date).toLocaleDateString("en-CA");
    counts[date] = (counts[date] || 0) + 1;
  });

  return counts;
}