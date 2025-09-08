// utils/API.js
export const API = {
    AUTH: {
      REGISTER: "/auth/register",
      LOGIN: "/auth/login",
      USER: "/auth/user",
      // UPLOAD_IMAGE: "/auth/upload-image", // backend commented out
    },
    INCOME: {
      ADD: "/income/add",
      LIST: "/income/get",
      UPDATE: (id) => `/income/update/${id}`,
      DELETE: (id) => `/income/delete/${id}`,
      DOWNLOAD: "/income/download/excel",
    },
    EXPENSE: {
      ADD: "/expense/add",
      LIST: "/expense/get",
      DELETE: (id) => `/expense/${id}`, // ✅ correct from backend
      DOWNLOAD: "/expense/download",   // ✅ matches controller
    },
    DASHBOARD: {
      GET: "/dashboard",
    },
  };
  