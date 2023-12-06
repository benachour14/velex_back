const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fonction pour créer un nouvel Article
const createArticle = async (req, res) => {
    const { title, content, publishDate, userId, clubId } = req.body;

    try {
        const article = await prisma.article.create({
            data: {
                title,
                content,
                publishDate,
                userId,
                clubId
            },
        });

        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Fonction pour obtenir tous les Articles
const getAllArticles = async (req, res) => {
    try {
        const articles = await prisma.article.findMany();
        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Fonction pour obtenir un Article spécifique
const getArticle = async (req, res) => {
    const { id } = req.params;

    try {
        const article = await prisma.article.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (article) {
            res.status(200).json(article);
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Fonction pour mettre à jour un Article spécifique
const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content, publishDate, userId, clubId } = req.body;

    try {
        const article = await prisma.article.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                content,
                publishDate,
                userId,
                clubId
            }
        });

        res.status(200).json(article);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Fonction pour supprimer un Article spécifique
const deleteArticle = async (req, res) => {
    const { id } = req.params;

    try {
        const article = await prisma.article.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json(article);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

// Exportez vos fonctions
module.exports = {
    createArticle,
    getAllArticles,
    getArticle,
    updateArticle,
    deleteArticle,
};