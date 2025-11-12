// import { BASE_API_URL, getToken } from "@/utils/data";
import { BASE_API_URL, getToken } from "@/Utils/data";

const trainerServices = {};

trainerServices.getAllTrainers = async () => {

   // Simulate fetching all traners
    const res = await fetch(`${BASE_API_URL}management/trainers/all`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return await res.json();
  };

trainerServices.createTrainer = async (data = {}) => {
  // Simulate fetching all trainers
  const res = await fetch(`${BASE_API_URL}management/trainers/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

trainerServices.updateTrainer = async (data = {}) => {
  // Simulate fetching all trainers
  const res = await fetch(
    `${BASE_API_URL}management/trainers/${data.trainer_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(data),
    }
  );
  return await res.json();
};

trainerServices.deleteTrainer = async (data = {}) => {
  // Simulate fetching all trainers
  const res = await fetch(`${BASE_API_URL}management/trainers/${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

trainerServices.getTrainer = async () => {
  // Simulate fetching all trainers
  const res = await fetch(`${BASE_API_URL}dashboard/trainer/get`, {
    method: "GET",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

export default trainerServices;