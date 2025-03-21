const { userService } = require("../services");

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const result = await userService.login(userName, password);
    res.json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || "Invalid credentials",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // No enviamos la contraseña en la respuesta
    const { password, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error retrieving profile",
    });
  }
};

module.exports = {
  login,
  getProfile,
};
