/**
 * Casts a vote on an existing poll.
 * 
 * @param pollId - The ID of the poll to vote on.
 * @param optionId - The ID of the selected poll option.
 * @param accessToken - The user's authentication token (JWT).
 * @returns The updated poll data as returned by the API.
 * @throws Error if the request fails or the response is not ok.
 */
export async function castVoteOnPoll(
  pollId: string,
  optionId: string,
  accessToken: string
) {
  try {
    const response = await fetch(`/Poll/${pollId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ optionId }),
    });

    if (response.status === 401) {
      throw new Error('Unauthorized: Please log in to vote.');
    }

    if (response.status === 404) {
      throw new Error('Poll not found.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.message || `Failed to cast vote: ${response.statusText}`
      );
    }

    // Assuming the API returns the updated poll object
    const poll = await response.json();
    return poll;
  } catch (error) {
    console.error('Error casting vote:', error);
    throw error;
  }
}

/**
 * Retrieves the results for a specific poll.
 * 
 * @param pollId - The ID of the poll to fetch results for.
 * @param accessToken - (Optional) The user's authentication token (JWT) if required.
 * @returns The poll results as returned by the API.
 * @throws Error if the request fails or the response is not ok.
 */
export async function getPollResults(
  pollId: string,
  accessToken?: string
) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`/Poll/${pollId}/results`, {
      method: 'GET',
      headers,
    });

    if (response.status === 401) {
      throw new Error('Unauthorized: Please log in to view poll results.');
    }

    if (response.status === 404) {
      throw new Error('Poll not found.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.message || `Failed to fetch poll results: ${response.statusText}`
      );
    }

    // Assuming the API returns the poll results object
    const results = await response.json();
    return results;
  } catch (error) {
    console.error('Error fetching poll results:', error);
    throw error;
  }
}

/**
 * Example usage:
 * 
 * import { castVoteOnPoll, getPollResults } from '../utils/pollApi';
 * 
 * // Cast a vote
 * castVoteOnPoll('poll123', 'option456', 'user-jwt-token')
 *   .then(updatedPoll => console.log('Vote cast! Updated poll:', updatedPoll))
 *   .catch(err => alert(err.message));
 * 
 * // Get poll results
 * getPollResults('poll123', 'user-jwt-token')
 *   .then(results => console.log('Poll results:', results))
 *   .catch(err => alert(err.message));
 */