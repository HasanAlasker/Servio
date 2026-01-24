import { apiClient } from "./client";

const endpoint = "/cars";

export const getAllCars = () => apiClient.get(`${endpoint}/all`);

export const getMakeAndModels = () => apiClient.get(`${endpoint}/car-makes`);

export const getMyCars = () => apiClient.get(`${endpoint}/mine`);

export const getCarById = (id) => apiClient.get(`${endpoint}/${id}`);

export const addCar = (data) => {
  const formData = new FormData();

  formData.append("make", data.make);
  formData.append("name", data.name);
  formData.append("model", data.model);
  formData.append("color", data.color);
  formData.append("plateNumber", data.plateNumber);
  formData.append("mileage", data.mileage);

  if (data.image) {
    const imageUri = data.image;
    const filename = imageUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image/jpeg";

    formData.append("image", {
      uri: imageUri,
      name: filename,
      type: type,
    });
  }

  if (data.imagePublicId) {
    formData.append("imagePublicId", data.imagePublicId);
  }

  return apiClient.post(`${endpoint}/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editCar = (id, data) => {
  const formData = new FormData();

  formData.append("make", data.make);
  formData.append("name", data.name);
  formData.append("model", data.model);
  formData.append("color", data.color);
  formData.append("plateNumber", data.plateNumber);
  formData.append("mileage", data.mileage);

  if (data.image) {
    // Check if it's a new image (local URI) or existing image (URL)
    if (
      data.image.startsWith("file://") ||
      data.image.startsWith("content://")
    ) {
      const imageUri = data.image;
      const filename = imageUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";

      formData.append("image", {
        uri: imageUri,
        name: filename,
        type: type,
      });
    } else {
      // Existing image URL - just send it as is
      formData.append("image", data.image);
    }
  }
  
  if (data.imagePublicId) {
    formData.append("imagePublicId", data.imagePublicId);
  }

  return apiClient.patch(`${endpoint}/edit/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateMileage = (id, data) =>
  apiClient.patch(`${endpoint}/mileage/${id}`, data);

export const deleteCar = (id) => apiClient.patch(`${endpoint}/delete/${id}`);
