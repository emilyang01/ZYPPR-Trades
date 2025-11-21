const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

const validateName = (name) => name && name.trim().length >= 2;

module.exports = { validateEmail, validatePassword, validateName };