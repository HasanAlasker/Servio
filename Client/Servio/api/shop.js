import { apiClient } from "./client";

const endpoint = "/shops";

export const getVerifiedShops = () => apiClient.get(`${endpoint}/verified`);

export const getUnVerifiedShops = () =>
  apiClient.get(`${endpoint}/un-verified`);

export const getMyShop = () => apiClient.get(`${endpoint}/mine`);

export const getShopById = (id) => apiClient.get(`${endpoint}/${id}`);

export const openShop = (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("phone", data.phone);
  formData.append("link", data.link);
  formData.append("address[city]", data.address.city);
  formData.append("address[area]", data.address.area);
  formData.append("address[street]", data.address.street);

  // Handle services array
  if (data.services && Array.isArray(data.services)) {
    data.services.forEach((service, index) => {
      formData.append(`services[${index}][name]`, service.name);
    });
  }

  // Handle openHours array
  if (data.openHours && Array.isArray(data.openHours)) {
    data.openHours.forEach((hour, index) => {
      formData.append(`openHours[${index}][day]`, hour.day);
      formData.append(`openHours[${index}][dayName]`, hour.dayName);
      formData.append(`openHours[${index}][isOpen]`, hour.isOpen);
      if (hour.isOpen) {
        formData.append(`openHours[${index}][from]`, hour.from);
        formData.append(`openHours[${index}][to]`, hour.to);
      }
    });
  }

  // Handle image upload
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

  return apiClient.post(`${endpoint}/openShop`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editShop = (id, data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("phone", data.phone);
  formData.append("link", data.link);
  formData.append("address[city]", data.address.city);
  formData.append("address[area]", data.address.area);
  formData.append("address[street]", data.address.street);

  // Handle services array
  if (data.services && Array.isArray(data.services)) {
    data.services.forEach((service, index) => {
      formData.append(`services[${index}][name]`, service.name);
    });
  }

  // Handle openHours array
  if (data.openHours && Array.isArray(data.openHours)) {
    data.openHours.forEach((hour, index) => {
      formData.append(`openHours[${index}][day]`, hour.day);
      formData.append(`openHours[${index}][dayName]`, hour.dayName);
      formData.append(`openHours[${index}][isOpen]`, hour.isOpen);
      if (hour.isOpen) {
        formData.append(`openHours[${index}][from]`, hour.from);
        formData.append(`openHours[${index}][to]`, hour.to);
      }
    });
  }

  // Handle image upload
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

  return apiClient.patch(`${endpoint}/editShop/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteShop = (id) => apiClient.patch(`${endpoint}/edit/${id}`);

export const verifyShop = (id) => apiClient.patch(`${endpoint}/verify/${id}`);
