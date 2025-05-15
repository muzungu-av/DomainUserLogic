const { DomainError } = require("./user.entity"); // circular import avoidance example
const { v4: uuidv4 } = require("uuid");

class DomainError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "DomainError";
  }
}

class User {
  constructor({ id, email, passwordHash, isActive = false }) {
    this.id = id || uuidv4();
    this.email = email;
    this.passwordHash = passwordHash;
    this.isActive = isActive;
  }

  static create({ email, password }) {
    // хешировать
    const hash = require("bcrypt").hashSync(password, 10);
    return new User({ email, passwordHash: hash });
  }

  static from(raw) {
    return new User({
      id: raw._id,
      email: raw.email,
      passwordHash: raw.passwordHash,
      isActive: raw.isActive,
    });
  }

  activate() {
    if (this.isActive) throw new DomainError("Already active");
    this.isActive = true;
  }
}

module.exports = { User, DomainError };
