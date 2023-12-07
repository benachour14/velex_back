require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

// Fonction pour créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  const { name, email, role, password } = req.body;
  console.log(req.body);
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      role,
      password: hashedPassword,
    },
  });

  // Générer un JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

  // Envoyer le JWT dans la réponse
  res.json({ user, token });
};

// Fonction pour obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// Fonction pour obtenir un utilisateur par ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json(user);
};

// Fonction pour mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, password } = req.body;

  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Hash the password if it has been changed
  const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name,
      email,
      role,
      password: hashedPassword,
    },
  });

  res.json(updatedUser);
};

// Fonction pour supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await prisma.user.delete({ where: { id: Number(id) } });
  res.json(deletedUser);
};

// Fonction pour connecter un utilisateur existant
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Trouver l'utilisateur dans la base de données
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: 'user non trouvé' });

  // Vérifier le mot de passe
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'Mot de passe incorrect' });

  // Générer un JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

  // Envoyer le JWT dans la réponse
  res.json({ user, token });
};