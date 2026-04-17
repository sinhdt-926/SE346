import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("app_data_v2.db");

export let currentUser = null;
export const setCurrentUser = (user) => {
  currentUser = user;
};

export const initDB = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        address TEXT,
        avatarUrl TEXT,
        description TEXT
      );
      CREATE TABLE IF NOT EXISTS Posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        author TEXT,
        date TEXT
      );
      CREATE TABLE IF NOT EXISTS COMMENTS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        postId INTEGER,
        author TEXT,
        content TEXT,
        date TEXT,
        FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE CASCADE
      );
    `);
    console.log("Khởi tạo database thành công!");
  } catch (error) {
    console.error("Lỗi khởi tạo DB:", error);
  }
};

export const registerUserDB = async (name, email, password) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
    );
    return { success: true, id: result.lastInsertRowId };
  } catch (error) {
    return { success: false, error: "Email is already registered!" };
  }
};

export const loginUserDB = async (email, password) => {
  const user = await db.getFirstAsync(
    "SELECT * FROM Users WHERE email = ? AND password = ?",
    [email, password],
  );
  return user;
};

export const getUserInfoDB = async (id) => {
  return await db.getFirstAsync("SELECT * FROM Users WHERE id = ?", [id]);
};

export const updateUserInfoDB = async (
  id,
  name,
  address,
  avatarUrl,
  description,
) => {
  await db.runAsync(
    "UPDATE Users SET name = ?, address = ?, avatarUrl = ?, description = ? WHERE id = ?",
    [name, address, avatarUrl, description, id],
  );
};

export const addPostDB = async (title, description, author, date) => {
  await db.runAsync(
    "INSERT INTO Posts (title, description, author, date) VALUES (?, ?, ?, ?)",
    [title, description, author, date],
  );
};

export const getPostsDB = async () => {
  return await db.getAllAsync("SELECT * FROM Posts ORDER BY id DESC");
};

export const addCommentDB = async (postId, author, content, date) => {
  await db.runAsync(
    "INSERT INTO Comments (postId, author, content, date) VALUES (?, ?, ?, ?)",
    [postId, author, content, date],
  );
};

export const getCommentsByPostDB = async (postId) => {
  return await db.getAllAsync(
    "SELECT * FROM Comments WHERE postId = ? ORDER BY id ASC",
    [postId],
  );
};
