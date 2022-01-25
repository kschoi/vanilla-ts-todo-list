import { ITodoData } from "../components/Todo";

const API_ENDPOINT = "http://localhost:3004";

const request = async (resource: string, init?: Record<string, any>) => {
  try {
    const response = await fetch(resource, init);
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
  fetchAll: async () => {
    try {
      const result = await request(`${API_ENDPOINT}/todos`);
      return result;
    } catch (e) {
      return e;
    }
  },
  add: async (data: Partial<ITodoData>) => {
    try {
      const result = await request(`${API_ENDPOINT}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return result;
    } catch (e) {
      return e;
    }
  },
  delete: async (id: number) => {
    try {
      const result = await request(`${API_ENDPOINT}/todos/${id}`, {
        method: "DELETE",
      });
      return result;
    } catch (e) {
      return e;
    }
  },
  update: async (id: number, data: Partial<ITodoData>) => {
    try {
      const result = await request(`${API_ENDPOINT}/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return result;
    } catch (e) {
      return e;
    }
  },
};

export default api;
