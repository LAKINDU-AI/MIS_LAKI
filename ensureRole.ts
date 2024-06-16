// ensureRole.ts

require { Request, Response, NextFunction } from 'express';

const ensureRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user && req.user.role === role) {
            return next();
        } else {
            return res.status(403).send('Forbidden'); // Access denied
        }
    };
};

export default ensureRole;
