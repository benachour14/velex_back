const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fonction pour créer une nouvelle association UserClub
const createUserClub = async (req, res) => {
    const { userId, clubId, joinDate, role } = req.body;

    try {
        const userClub = await prisma.userClub.create({
            data: {
                userId,
                clubId,
                joinDate,
                role
            },
        });

        res.status(201).json(userClub);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Fonction pour obtenir toutes les associations UserClub
const getAllUserClubs = async (req, res) => {
    try {
        const userClubs = await prisma.userClub.findMany();
        res.status(200).json(userClubs);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Fonction pour obtenir une association UserClub specifique
const getUserClub = async (req, res) => {
    const { userId, clubId } = req.params;

    try {
        const userClub = await prisma.userClub.findUnique({
            where: {
                userId_clubId: {
                    userId: Number(userId),
                    clubId: Number(clubId)
                }
            }
        });

        if (userClub) {
            res.status(200).json(userClub);
        } else {
            res.status(404).json({ error: 'UserClub not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Fonction pour mettre à jour une association UserClub spécifique
const updateUserClub = async (req, res) => {
    const { userId, clubId } = req.params;
    const { joinDate, role } = req.body;

    try {
        const userClub = await prisma.userClub.update({
            where: {
                userId_clubId: {
                    userId: Number(userId),
                    clubId: Number(clubId)
                }
            },
            data: {
                joinDate,
                role
            }
        });

        res.status(200).json(userClub);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Fonction pour supprimer une association UserClub spécifique
const deleteUserClub = async (req, res) => {
    const { userId, clubId } = req.params;

    try {
        const userClub = await prisma.userClub.delete({
            where: {
                userId_clubId: {
                    userId: Number(userId),
                    clubId: Number(clubId)
                }
            }
        });

        res.status(200).json(userClub);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Exportez vos fonctions
module.exports = {
    createUserClub,
    getAllUserClubs,
    getUserClub,
    updateUserClub,
    deleteUserClub,
};