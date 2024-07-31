const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors'); // Import the cors package

const app = express();
const prisma = new PrismaClient();
const corsOptions = {
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
    preflightContinue: false,
    optionsSuccessStatus: 204
};


app.use(cors(corsOptions)); // Use the cors middleware
app.use(express.json());

// Create a new blog
app.post('/blogs', async (req, res) => {
    try {
        const blog = await prisma.blog.create({
            data: req.body
        });
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all blogs
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single blog by ID
app.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await prisma.blog.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (blog) {
            res.status(200).json(blog);
        } else {
            res.status(404).json({ error: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a blog by ID
app.put('/blogs/:id', async (req, res) => {
    try {
        const blog = await prisma.blog.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        });
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a blog by ID
app.delete('/blogs/:id', async (req, res) => {
    try {
        await prisma.blog.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(200).json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Use the PORT environment variable or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
