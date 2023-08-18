import axios from 'axios';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment'; // Replace with your API endpoint

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    const { tickets } = response.data;
    const { users } = response.data;
    console.log(users)
    // console.log(tickets);
    // console.log(users) // Extract the "tickets" array directly from the response
    return {tickets, users}
  } catch (error) {
    console.error('Error fetching tasks:', error);

    return { tickets: [], users: [] };
  }
};
