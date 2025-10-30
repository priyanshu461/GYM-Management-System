const { BASE_API_URL, TOKEN } = require("@/Utils/data");

const trainerServices = {};

trainerServices.getAllTrainers = async (data = {}) => {

   // Simulate fetching all traners
    const res = await fetch(`${BASE_API_URL}dashboard/trainer/all`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      data: json.stringify(data),
    });
    return await res.json();
  };

trainerServices.createTrainer = async (data = {}) => {
  // Simulate fetching all trainers
  const res = await fetch(`${BASE_API_URL}dashboard/trainer/create`, {
    method: "POST",
    headers: {
      "Content-Type": "mulptipart/form-data",
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
      headers: { Authorization: `Bearer ${TOKEN}` },
      data: json.stringify(data),
    }
  );
  return await res.json();
};

trainerServices.deleteTrainer = async (data = {}) => {
  // Simulate fetching all trainers
  const res = await fetch(`${BASE_API_URL}dashboard/trainer/delete`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    data: json.stringify(data),
  });
  return await res.json();
};

trainerService.getTrainer = async (data = {}) => {
  // Simulate fetching all trainers
  const res = await fetch(`${BASE_API_URL}dashboard/trainer/get`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    data: json.stringify(data),
  });
  return await res.json();
};

export default trainerServices;