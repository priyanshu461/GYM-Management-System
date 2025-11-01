import { BASE_API_URL, TOKEN } from "@/Utils/data";

const trainerServices = {};

trainerServices.getAllTrainers = async () => {

   // Simulate fetching all traners
    const res = await fetch(`${BASE_API_URL}dashboard/trainer/all`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return await res.json();
  };

trainerServices.createTrainer = async (data = {}) => {
  // Simulate fetching all trainers
  const res = await fetch(`${BASE_API_URL}dashboard/trainer/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: data,
  });
  return await res.json();
};

trainerServices.updateTrainer = async (data = {}) => {
  // Simulate fetching all trainers
  const res = await fetch(
    `${BASE_API_URL}dashboard/trainer/update/${data.trainer_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify(data),
    }
  );
  return await res.json();
};

trainerServices.deleteTrainer = async (data = {}) => {
  // Simulate fetching all trainers
  const res = await fetch(`${BASE_API_URL}dashboard/trainer/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

trainerServices.getTrainer = async () => {
  // Simulate fetching all trainers
  const res = await fetch(`${BASE_API_URL}dashboard/trainer/get`, {
    method: "GET",
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return await res.json();
};

export default trainerServices;