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

trainerServices.getAllTrainersForSalary = async () => {
  const res = await fetch(`${BASE_API_URL}management/trainers/all-for-salary`, {
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

trainerServices.getTrainersByGym = async (gymId) => {
  const res = await fetch(`${BASE_API_URL}management/trainers/gym/${gymId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
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

trainerServices.createSchedule = async (data = {}) => {
  const res = await fetch(`${BASE_API_URL}trainers/schedules/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
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

trainerServices.getTrainerSalaryDetails = async (trainerId) => {
  const res = await fetch(`${BASE_API_URL}management/trainers/salary/${trainerId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

trainerServices.getAllTrainerSalaryDetails = async () => {
  const res = await fetch(`${BASE_API_URL}management/trainers/salary/all`, {
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

// Payment record services
trainerServices.addPaymentRecord = async (trainerId, data = {}) => {
  const res = await fetch(`${BASE_API_URL}management/trainers/${trainerId}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

trainerServices.updatePaymentRecord = async (trainerId, paymentId, data = {}) => {
  const res = await fetch(`${BASE_API_URL}management/trainers/${trainerId}/payment/${paymentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

trainerServices.deletePaymentRecord = async (trainerId, paymentId) => {
  const res = await fetch(`${BASE_API_URL}management/trainers/${trainerId}/payment/${paymentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return await res.json();
};

trainerServices.getAllTrainerPaymentDates = async () => {
  const res = await fetch(`${BASE_API_URL}management/trainers/payment-dates`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

trainerServices.getTrainerStats = async () => {
  const res = await fetch(`${BASE_API_URL}trainers/stats`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

trainerServices.getWorkouts = async () => {
  const res = await fetch(`${BASE_API_URL}trainers/workouts`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

trainerServices.getAssignedMembers = async () => {
  const res = await fetch(`${BASE_API_URL}trainers/assigned-members`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

trainerServices.getTrainerActivities = async () => {
  const res = await fetch(`${BASE_API_URL}trainers/activities`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

trainerServices.getTrainerClasses = async () => {
  const res = await fetch(`${BASE_API_URL}trainers/classes`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

// Member management services for trainers
trainerServices.assignMemberToTrainer = async (data = {}) => {
  const res = await fetch(`${BASE_API_URL}trainers/assign-member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

trainerServices.getAvailableMembers = async () => {
  const res = await fetch(`${BASE_API_URL}trainers/available-members`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return await res.json();
};

trainerServices.removeMemberFromTrainer = async (memberId) => {
  const res = await fetch(`${BASE_API_URL}trainers/remove-member/${memberId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return await res.json();
};

export default trainerServices;
