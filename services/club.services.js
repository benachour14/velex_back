const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fonction pour créer un nouveau club
exports.createClub = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId; 

  const club = await prisma.club.create({
    data: {
      name,
      users: {
        create: {
          joinDate: new Date(),
          role: 'creator',
          user: {
            connect: {
              id: userId
            }
          }
        }
      }
    },
  });

  res.json(club);
};

// Fonction pour obtenir tous les clubs
exports.getAllClubs = async (req, res) => {
  const clubs = await prisma.club.findMany();
  res.json(clubs);
};

// Fonction pour obtenir un club par ID
exports.getClubById = async (req, res) => {
  const { id } = req.params;

  const club = await prisma.club.findUnique({ where: { id: Number(id) } });
  if (!club) return res.status(404).json({ error: 'Club not found' });

  res.json(club);
};

// Fonction pour mettre à jour un club
exports.updateClub = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const club = await prisma.club.findUnique({ where: { id: Number(id) } });
  if (!club) return res.status(404).json({ error: 'Club not found' });

  const updatedClub = await prisma.club.update({
    where: { id: Number(id) },
    data: {
      name
    },
  });

  res.json(updatedClub);
};

// Fonction pour supprimer un club
exports.deleteClub = async (req, res) => {
  const { id } = req.params;
  const parsedId = Number(id);

  // Supprimer les UserClub, Events et Articles liés
  await prisma.userClub.deleteMany({ where: { clubId: parsedId } });
  await prisma.event.deleteMany({ where: { clubId: parsedId } });
  await prisma.article.deleteMany({ where: { clubId: parsedId } });

  // Ensuite, supprimer le Club
  const deletedClub = await prisma.club.delete({ where: { id: parsedId } });

  res.json(deletedClub);
};