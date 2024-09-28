// src/api/products.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/products"; // Địa chỉ API của bạn

export const getProducts = async (page = 1, limit = 10, search = "") => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}&search=${search}`,
  );
  return response.data; // Thay đổi nếu cần thiết
};

export const addProduct = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const editProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const bulkDeleteProducts = async (ids) => {
  await axios.delete(API_URL, { data: { ids } });
};
