// routes/admin.js

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const ensureAdmin = require('../middleware/ensureAdmin');

const prisma = new PrismaClient();

// Route to view all users (admin access)
router.get('/users', ensureAdmin, async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.render('admin', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        next(error);
    }
});

// Route to update user role (admin access)
router.post('/update-role', ensureAdmin, async (req, res, next) => {
    try {
        const { id, role } = req.body;

        // Update user role
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { role },
        });

        res.redirect('/admin/users');
    } catch (error) {
        console.error('Error updating user role:', error);
        next(error);
    }
});

module.exports = router;
