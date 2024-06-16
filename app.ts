import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import session from 'express-session';
import path from 'path';

const prisma = new PrismaClient();
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

app.use(express.static(path.join(__dirname, 'public')));

function auth(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user && req.session.user.role === role) {
      next();
    } else {
      res.redirect('/');
    }
  };
}

app.get('/', (req: Request, res: Response) => {
  res.render('login');
});

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && user.password === password) {
    req.session.user = user;
    switch (user.role) {
      case 'ADMIN':
        res.redirect('/admin');
        break;
      case 'HQ_MANAGER':
        res.redirect('/hq_manager');
        break;
      case 'MANAGER':
        res.redirect('/manager');
        break;
      case 'WAITER':
        res.redirect('/waiter');
        break;
      default:
        res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
});

app.get('/admin', auth('ADMIN'), (req: Request, res: Response) => {
  res.render('admin');
});

app.get('/hq_manager', auth('HQ_MANAGER'), async (req: Request, res: Response) => {
  const sales = await prisma.sale.findMany({ include: { Branch: true } });
  res.render('hq_manager', { sales });
});

app.get('/manager', auth('MANAGER'), async (req: Request, res: Response) => {
  if (req.session.user) {
    const sales = await prisma.sale.findMany({ where: { branchId: req.session.user.branchId } });
    res.render('manager', { sales });
  } else {
    res.redirect('/');
  }
});

app.get('/waiter', auth('WAITER'), (req: Request, res: Response) => {
  res.render('waiter');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


