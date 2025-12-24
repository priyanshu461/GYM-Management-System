import { BASE_API_URL, getToken } from "../utils/data";

const notificationService = {};

notificationService.getNotifications = async (userId, params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);

  const url = `${BASE_API_URL}dashboard/notifications/${userId}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

notificationService.getUnreadCount = async (userId) => {
  const res = await fetch(`${BASE_API_URL}dashboard/notifications/${userId}/unread-count`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

notificationService.createNotification = async (data = {}) => {
  const res = await fetch(`${BASE_API_URL}dashboard/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

notificationService.markAsRead = async (id) => {
  const res = await fetch(`${BASE_API_URL}dashboard/notifications/${id}/read`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return await res.json();
};

notificationService.markAllAsRead = async (userId) => {
  const res = await fetch(`${BASE_API_URL}dashboard/notifications/${userId}/read-all`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return await res.json();
};

notificationService.deleteNotification = async (id) => {
  const res = await fetch(`${BASE_API_URL}dashboard/notifications/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return await res.json();
};

notificationService.sendBulkNotifications = async (data = {}) => {
  const res = await fetch(`${BASE_API_URL}dashboard/notifications/bulk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

notificationService.getNotificationStats = async (userId) => {
  const res = await fetch(`${BASE_API_URL}dashboard/notifications/${userId}/stats`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

notificationService.getActivityFeed = async () => {
  const res = await fetch(`${BASE_API_URL}dashboard/activity-feed`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

notificationService.getTemplates = async () => {
  const res = await fetch(`${BASE_API_URL}dashboard/templates`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

notificationService.getSegments = async () => {
  const res = await fetch(`${BASE_API_URL}dashboard/segments`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

notificationService.getSystemHealth = async () => {
  const res = await fetch(`${BASE_API_URL}dashboard/system-health`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

notificationService.getGlobalStats = async () => {
  const res = await fetch(`${BASE_API_URL}dashboard/global-stats`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

notificationService.sendToSegment = async (data = {}) => {
  const res = await fetch(`${BASE_API_URL}dashboard/send-to-segment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export default notificationService;
