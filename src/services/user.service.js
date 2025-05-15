const userRepo = require("../repositories/user.repository");
const bonusRepo = require("../repositories/bonus.repository");
const emailService = require("../integrations/email.service");
const logService = require("../integrations/log.service");
const { User, DomainError } = require("../domain/user.entity");
const { validateEmail, validatePassword } = require("../domain/user.rules");
const bonusService = require("../domain/bonus.service");

async function register({ email, password }) {
  if (!validateEmail(email)) throw new DomainError("Invalid email");
  if (!validatePassword(password)) throw new DomainError("Weak password");
  if (await userRepo.findByEmail(email))
    throw new DomainError("Already exists");

  const user = User.create({ email, password });
  await userRepo.save(user);
  await logService.log(`User ${user.id} registered`);
  return user.id;
}

async function activate(userId) {
  const raw = await userRepo.findById(userId);
  if (!raw) throw new DomainError("User not found");

  const user = User.from(raw);
  user.activate();
  await userRepo.save(user);
  await logService.log(`User ${user.id} activated`);

  const bonus = bonusService.calculateFor(user);
  await bonusRepo.assign(user.id, bonus);
  await logService.log(`Assigned bonus ${bonus} to user ${user.id}`);

  await emailService.sendWelcomeEmail(user.email);
  await logService.log(`Sent email to ${user.email}`);
}

module.exports = { register, activate };
