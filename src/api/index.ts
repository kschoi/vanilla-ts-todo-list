const API_ENDPOINT = "http://localhost:3004";

const request = async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errData = await response.json();
      throw errData;
    }
  } catch (e: any) {
    throw {
      message: e.message,
      status: e.status,
    };
  }
};

const api = {
  fetchAllTodos: async () => {
    try {
      const result = await request(`${API_ENDPOINT}/todos`);
      return result;
    } catch (e) {
      return e;
    }
  },
};

export default api;
