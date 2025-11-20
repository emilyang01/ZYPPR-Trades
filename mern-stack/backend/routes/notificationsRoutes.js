
//example (but also maybe usable?):
// Get unread notifications for a user
const notifications = await Notification.find({ user: userId, read: false });