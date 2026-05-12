// Service responsible for fetching/persisting recommendation-related data.
// This is a placeholder; replace with real API integration.
export async function getRecommendations(filters = {}) {
  try {
    // Simulate async work
    await new Promise((res) => setTimeout(res, 200))

    // Return a minimal mock payload that can be expanded later
    return [
      { id: 'r1', name: 'Balanced Ultrabook', score: 92, filters },
      { id: 'r2', name: 'Performance Gaming', score: 88, filters }
    ]
  } catch (err) {
    console.error('recommendationService.getRecommendations error', err)
    throw err
  }
}
