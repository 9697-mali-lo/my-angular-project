import { Routes } from '@angular/router';
import { Login } from './components/Auth/login/login';
import { Register } from './components/Auth/register/register';
import { TeamList } from './components/Teams/team-list/team-list';
import { ProjectBoard } from './components/Projects/project-board/project-board';
import { TaskBoard } from './components/Task/task-board/task-board';
//  import {TaskBoard}from 'C:\Users\user1\Desktop\angular-project\my-angular-app\src\app\components\Task\task-board'  
export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    // 1. נתיבי התחברות והרשמה (ללא סיידבר/תפריט מערכת)
  {
    path: 'auth',
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]

  },
  { path: 'teams',component:TeamList },
  { path: 'projects',component:ProjectBoard },
  { path: 'projects/:teamId',component:ProjectBoard },
  // { path: 'projects/:teamId', component: ProjectsComponent },
  { path: 'tasks',component:TaskBoard },
  { path: 'tasks/:taskId/comments', component: TaskCommentsComponent },
  { path: 'projects/:projectId/tasks', component: TaskBoard }

   
];
