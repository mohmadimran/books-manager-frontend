import axios from "axios";
const API = axios.create({
  baseURL: "https://book-manager-ev44.onrender.com/",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth
export const registerUser = (userData) =>
  API.post("/api/auth/signup", userData);
export const loginUser = (userData) => API.post("/api/auth/login", userData);

// Books CRUD
export const getBooks = () => API.get("/api/books");
export const addBook = (data) => API.post("/api/books", data);
export const updateBook = (id, data) => API.put(`/api/books/${id}`, data);
export const deleteBook = (id) => API.delete(`/api/books/${id}`);

export default API;
