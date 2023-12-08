const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fonction pour obtenir tous les événements
const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// Fonction pour obtenir un événement spécifique
const getEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// Fonction pour supprimer un événement spécifique
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

const createEvent = async (req, res) => {
  const {
    name,
    startDate,
    endDate,
    places,
    address,
    city,
    country,
    eventType,
    clubId,
    description,
  } = req.body;

  try {
    const event = await prisma.event.create({
      data: {
        name,
        startDate,
        endDate,
        places,
        address, // Ajout du champ address
        city, // Ajout du champ city
        country, // Ajout du champ country
        eventType, // Ajout du champ eventType
        clubId,
        description,
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    startDate,
    endDate,
    places,
    address,
    city,
    country,
    eventType,
    clubId,
    description,
  } = req.body;

  try {
    const event = await prisma.event.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        startDate,
        endDate,
        places,
        address, 
        city, 
        country,
        eventType,
        clubId,
        description,
      },
    });

    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};
// Exportez vos fonctions
module.exports = {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
