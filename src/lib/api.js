import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Interceptor para autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

import { jwtDecode } from "jwt-decode";

export async function login(username, password) {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  const response = await axios.post(
    "http://localhost:8000/auth/token",
    params,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  const accessToken = response.data.access_token;

  // Guardar token
  localStorage.setItem("token", accessToken);

  // Decodificar y guardar rol
  const decoded = jwtDecode(accessToken);
  localStorage.setItem("role", decoded.role);

  return decoded;
}

export const getStations = async () => {
  const response = await api.get("/stations/");
  return response.data;
};

export const createStation = async (stationData) => {
  const response = await api.post("/stations/", stationData);
  return response.data;
};

export const updateStation = async (id, stationData) => {
  const response = await api.put(`/stations/${id}`, stationData);
  return response.data;
};

export const toggleStationStatus = async (id, status) => {
  const response = await api.put(`/stations/${id}`, { current_status: status });
  return response.data;
};

export const getUsageData = async (range = "day") => {
  try {
    // Validar el parámetro range
    const validRanges = ["hour", "day", "week", "month"];
    if (!validRanges.includes(range)) {
      throw new Error(`Rango no válido. Use: ${validRanges.join(", ")}`);
    }

    const response = await api.get(`/stations/usage`, {
      params: { range },
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    // Validar la estructura de la respuesta
    if (!response.data || !response.data.labels || !response.data.values) {
      throw new Error("Formato de datos incorrecto desde el servidor");
    }

    return {
      labels: response.data.labels,
      values: response.data.values.map(Number),
    };
  } catch (error) {
    console.error("Error fetching usage data:", error);
    throw error;
  }
};
