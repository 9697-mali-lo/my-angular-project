import { Routes } from '@angular/router';
import { Login } from './components/Auth/login/login';
import { Register } from './components/Auth/register/register';
import { TeamList } from './components/Teams/team-list/team-list';
import { ProjectBoard } from './components/Projects/project-board/project-board';
import { TaskBoard } from './components/Task/task-board/task-board';
import { TaskCommentsPage } from './components/comments/task-comments-page/task-comments-page';
import { authGuard } from './components/Auth/routes/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ]
  },

  {
    path: '',            // נתיב בסיס לקבוצה
    canActivate: [authGuard], // ה-Guard יחול על כל הילדים
    children: [
  { path: 'teams', component: TeamList },

  // משימות של פרויקט
  { path: 'projects/:projectId/tasks', component: TaskBoard },

  // לוח פרויקטים של צוות
  { path: 'projects/:teamId', component: ProjectBoard },
  { path: 'projects', component: ProjectBoard },

  { path: 'tasks/:taskId/comments', component: TaskCommentsPage },
  { path: 'tasks', component: TaskBoard },
 ]},
  // fallback
  { path: '**', redirectTo: 'login' }
];
