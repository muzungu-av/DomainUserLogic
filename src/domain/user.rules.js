function validateEmail(email) {
  return /^[^@]+@[^@]+\.[^@]+$/.test(email);
}
function validatePassword(pwd) {
  return pwd.length >= 8 && /\d/.test(pwd);
}
module.exports = { validateEmail, validatePassword };
