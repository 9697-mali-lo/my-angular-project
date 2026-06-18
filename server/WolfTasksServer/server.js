import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import './src/db.js';
import authRouter from './src/routes/auth.js';
import teamsRouter from './src/routes/teams.js';
import projectsRouter from './src/routes/projects.js';
import tasksRouter from './src/routes/tasks.js';
import commentsRouter from './src/routes/comments.js';
import usersRouter from './src/routes/users.js';

const app = express();

// app.use(helmet());
// הגדרת הכתובות המורשות לבקשות רשת (connect-src)
const allowedConnectSrc = ["'self'", "http://localhost:3000", "http://localhost:4200"];

// אם אנחנו בסביבת פרודקשן ברנדר, נוסיף גם את הכתובת של רנדר
if (process.env.NODE_ENV === 'production') {
  allowedConnectSrc.push("https://my-angular-project-h5uv.onrender.com");
}

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: allowedConnectSrc,
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
    },
  })
);
app.use(cors({ origin: '*'}));
app.use(express.json());
app.use(morgan('dev'));

// Health
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// API routes
app.use('/api/auth', authRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.path });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API listening on port ${PORT}`);
});
