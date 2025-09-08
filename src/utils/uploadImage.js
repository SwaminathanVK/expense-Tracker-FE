// utils/uploadImage.js
import axiosInstance from "./axiosInstance.js";
import { API } from "./apiPath.js";

/**
 * Uploads an image to the server
 * @param {File} imageFile - File object (from <input type="file" />)
 * @returns {Promise<{ imageUrl: string }>}
 */
export default async function uploadImage(imageFile) {
  if (!imageFile) throw new Error("No image file provided");

  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await axiosInstance.post(API.AUTH.UPLOAD_IMAGE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // { imageUrl }
}
