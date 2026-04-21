import axios from "axios";

const BASE_URL = "http://blackntt.net:4321";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerAPI = async (email, password, name, description) => {
  try {
    const response = await apiClient.post("/register", {
      email: email,
      password: password,
      name: name,
      description: description,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginAPI = async (email, password) => {
  try {
    const response = await apiClient.post("/login", null, {
      params: {
        email: email,
        password: password,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getPostsAPI = async () => {
  try {
    const response = await apiClient.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const createPostAPI = async (title, description, creator_email) => {
  try {
    const response = await apiClient.post("/posts", {
      title: title,
      description: description,
      creator_email: creator_email,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const deletePostAPI = async (post_id) => {
  try {
    const response = await apiClient.delete(`/posts/${post_id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting post:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getPostByIdAPI = async (post_id) => {
  try {
    const response = await apiClient.get(`/posts/${post_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};

let currentUser = null;

export const setCurrentUser = (user) => {
  currentUser = user;
  console.log("Đã lưu thông tin user:", currentUser);
};

export const getCurrentUser = () => {
  return currentUser;
};
