const pushNotification = (type, typeId, title, message) => {
  // Logic to push notification to the member
  console.log(
    `Notification - Type: ${type}, ID: ${typeId} - Title: ${title} - Message: ${message}`
  );
};

module.exports = {
  pushNotification,
};
