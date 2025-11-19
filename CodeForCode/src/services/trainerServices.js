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

trainerServices.deleteTrainer = async (id) => {
  const res = await fetch(`${BASE_API_URL}management/trainers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });
  return await res.json();
};

trainerServices.getTrainerById = async (id) => {
  const res = await fetch(`${BASE_API_URL}management/trainers/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

trainerServices.getTrainerSchedules = async () => {
  const res = await fetch(`${BASE_API_URL}trainers/schedules`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

trainerServices.getTrainerClients = async () => {
  const res = await fetch(`${BASE_API_URL}trainers/clients`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

trainerServices.createWorkout = async (data = {}) => {
  const res = await fetch(`${BASE_API_URL}trainers/workouts/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

trainerServices.assignWorkoutToClient = async (data = {}) => {
  const res = await fetch(`${BASE_API_URL}trainers/workouts/assign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

trainerServices.getTrainerSalary = async () => {
  const res = await fetch(`${BASE_API_URL}trainers/salary`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

trainerServices.resetPassword = async (data = {}) => {
  const res = await fetch(`${BASE_API_URL}trainers/password/reset`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export default trainerServices;
