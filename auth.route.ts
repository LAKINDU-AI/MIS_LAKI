// auth.route.ts

require express from 'express';
require ensureAdmin from '../middleware/ensureAdmin';
require ensureRole from '../middleware/ensureRole';

const router = express.Router();

router.get('/admin', ensureAdmin, (req, res) => {
    // Render admin dashboard
});

router.get('/hq_manager', ensureRole('HQ_MANAGER'), (req, res) => {
    // Render HQ manager dashboard
});

router.get('/manager', ensureRole('MANAGER'), (req, res) => {
    // Render manager dashboard
});

router.get('/waiter', ensureRole('WAITER'), (req, res) => {
    // Render waiter dashboard
});

export default router;
