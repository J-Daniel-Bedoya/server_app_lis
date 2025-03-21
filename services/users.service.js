const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {
  async login(userName, password) {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, username: user.userName, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    return {
      token,
      user: { 
        id: user.id, 
        userName: user.userName, 
        role: user.role,
        fullName: user.fullName,
        email: user.email
      },
    };
  }

  async createUser(userData) {
    // Verificar si es el primer usuario
    const userCount = await User.count();
    const isFirstUser = userCount === 0;

    // Si es el primer usuario, forzar el rol como admin
    const role = isFirstUser ? "admin" : userData.role || "technician";

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
      ...userData,
      password: hashedPassword,
      role,
    });

    // Solo devolver los datos del usuario sin contraseña
    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async getAllUsers() {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return users;
  }

  async getUserById(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async updateUser(id, userData) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    // Si se está actualizando la contraseña, hashearla
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    await user.update(userData);

    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    // Prevenir la eliminación del último admin
    const adminCount = await User.count({ where: { role: "admin" } });
    if (user.role === "admin" && adminCount <= 1) {
      throw new Error("Cannot delete the last admin user");
    }

    await user.destroy();
    return { message: "User deleted successfully" };
  }
}

module.exports = new UserService();
