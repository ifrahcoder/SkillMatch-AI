import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const fetchLiveJobs = async (keywords, location) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/jobs/global-search`, {
      keywords,
      location
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching live jobs:", error);
    return { success: false, jobs: [] };
  }
};