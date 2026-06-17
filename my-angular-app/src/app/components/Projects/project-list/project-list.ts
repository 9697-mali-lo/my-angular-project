import { Component, inject, input, computed, signal, OnInit } from '@angular/core';
import { Project, projectsService } from '../../../services/projectService';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { ProjectDialogService } from '../../../services/ProjectDialogService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [MatCard, MatCardContent, MatIcon],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {
  private router = inject(Router);
  projects = input<Project[]>([]);
 
  ngOnInit() {
   
  }



  // פונקציה למעבר לדף משימות
goToProjectTasks(projectId: number | undefined) {
  if (projectId) {
    this.router.navigate(['/projects', projectId, 'tasks']);
  }
}

// פונקציה להוספת משימה מהירה (פתיחת דיאלוג ייעודי)
onAddTask(event: Event, project: Project) {
  event.stopPropagation(); // מונע מהקליק להפעיל גם את המעבר לפרויקט
  console.log('Open add task dialog for project:', project.id);
  // כאן תוכל להזריק שירות דיאלוג למשימות ולפתוח אותו
}

}