const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fonction pour créer une nouvelle Participation
const createParticipation = async (req, res) => {
    const { userId, eventId, participationDate } = req.body;

    try {
        const participation = await prisma.participation.create({
            data: {
                userId,
                eventId,
                participationDate
            },
        });

        res.status(201).json(participation);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Fonction pour obtenir toutes les Participations
const getAllParticipations = async (req, res) => {
    try {
        const participations = await prisma.participation.findMany();
        res.status(200).json(participations);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Fonction pour obtenir une Participation spécifique
const getParticipation = async (req, res) => {
    const { userId, eventId } = req.params;

    try {
        const participation = await prisma.participation.findUnique({
            where: {
                userId_eventId: {
                    userId: Number(userId),
                    eventId: Number(eventId)
                }
            }
        });

        if (participation) {
            res.status(200).json(participation);
        } else {
            res.status(404).json({ error: 'Participation not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Fonction pour mettre à jour une Participation spécifique
const updateParticipation = async (req, res) => {
    const { userId, eventId } = req.params;
    const { participationDate } = req.body;

    try {
        const participation = await prisma.participation.update({
            where: {
                userId_eventId: {
                    userId: Number(userId),
                    eventId: Number(eventId)
                }
            },
            data: {
                participationDate
            }
        });

        res.status(200).json(participation);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Fonction pour supprimer une Participation spécifique
const deleteParticipation = async (req, res) => {
    const { userId, eventId } = req.params;

    try {
        const participation = await prisma.participation.delete({
            where: {
                userId_eventId: {
                    userId: Number(userId),
                    eventId: Number(eventId)
                }
            }
        });

        res.status(200).json(participation);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Exportez vos fonctions
module.exports = {
    createParticipation,
    getAllParticipations,
    getParticipation,
    updateParticipation,
    deleteParticipation,
};