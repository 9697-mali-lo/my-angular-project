
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
  private projectDialogService = inject(ProjectDialogService);
  private projectService = inject(projectsService);
  private router = inject(Router);
  /**
   * 1. הגדרת ה-Input עם Transform מפורש.
   * הטיפוס הראשון <number | null> הוא מה שהקומפוננטה תראה (הפלט).
   * הטיפוס השני הוא מה שה-URL עשוי לשלוח (string/number/null/undefined).
   */
  team_id = input<number | null, string | number | null | undefined>(null, {
    transform: (value) => (value !== null && value !== undefined ? Number(value) : null)
  });

  allProjects = signal<Project[]>([]);
  isLoading = signal(true);

  // projects = computed(() => {
  //   const currentId = this.team_id();
  //   const list = this.allProjects();
    
  //   // סינון לפי מספר הצוות
  //   if (currentId !== null) {
  //     // return list.filter(p => Number(p.team_id) === Number(currentId));
  //     return list.filter(p => {
  //       // בודק את team_id (מה שחוזר ב-GET) ואם לא קיים בודק את teamId
  //       const pTeamId = p.team_id ?? p.teamId;
  //       return Number(pTeamId) === Number(currentId);
  //     });
  //   }
  //   return list;
  // });
  projects = computed(() => {
    const currentId = Number(this.team_id()); // ה-ID שמתקבל מה-URL/Input
    const list = this.allProjects(); // כל הפרויקטים שהגיעו מהשרת
    
    return list.filter(p => {
      // התיקון: בדיקת שני השמות האפשריים (team_id מהשרת או teamId מה-Interface)
      const pTeamId = p.team_id ?? (p as any).teamId;
      return Number(pTeamId) === currentId;
    });
  });

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.isLoading.set(true);
  
    this.projectService.getProjects().subscribe({
      next: (data) => {
        console.log('Data from server:', data);
        this.allProjects.set([...data]);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  onclickCreateProject() {
    const currentId = this.team_id() ?? null;
  
    // פתיחת הדיאלוג דרך השירות
    this.projectDialogService.openCreateProjectDialog(currentId).subscribe(result => {
      // result יהיה true רק אם בתוך CreateProject כתבת this.dialogRef.close(true)
      if (result) {
        console.log('Project created, refreshing list for team:', currentId);
        this.loadProjects(); // קריאה לשרת להבאת הרשימה המעודכנת
      }
    });
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