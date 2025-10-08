// Utility to clean up localStorage watch history
// Run this in browser console if you have duplicate issues: cleanWatchHistory()

export function cleanWatchHistory() {
  try {
    const history = localStorage.getItem('watchHistory');
    if (!history) {
      console.log('No watch history found');
      return;
    }

    const parsed = JSON.parse(history);
    console.log(`Found ${parsed.length} items in history`);

    // Remove duplicates by slug
    const unique = parsed.filter((item: any, index: number, self: any[]) => 
      index === self.findIndex(t => t.slug === item.slug)
    );

    console.log(`After deduplication: ${unique.length} items`);

    // Sort by timestamp
    const sorted = unique.sort((a: any, b: any) => b.timestamp - a.timestamp);

    // Keep only last 20
    const cleaned = sorted.slice(0, 20);

    localStorage.setItem('watchHistory', JSON.stringify(cleaned));
    console.log(`Cleaned history saved with ${cleaned.length} items`);
    
    // Trigger update
    window.dispatchEvent(new Event('watchHistoryUpdated'));
    
    return cleaned;
  } catch (error) {
    console.error('Failed to clean watch history:', error);
    // If corrupted, clear it
    localStorage.removeItem('watchHistory');
    console.log('Cleared corrupted watch history');
  }
}

// Auto-clean on import (optional)
if (typeof window !== 'undefined') {
  // Check for duplicates on load
  const history = localStorage.getItem('watchHistory');
  if (history) {
    try {
      const parsed = JSON.parse(history);
      const unique = new Set(parsed.map((item: any) => item.slug));
      
      if (unique.size !== parsed.length) {
        console.log('Duplicates detected, cleaning...');
        cleanWatchHistory();
      }
    } catch (e) {
      console.error('Watch history corrupted, clearing...');
      localStorage.removeItem('watchHistory');
    }
  }
}
