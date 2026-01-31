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

  team_id = input<number | null, string | number | null | undefined>(null, {
    transform: (value) => (value !== null && value !== undefined ? Number(value) : null)
  });

  allProjects = signal<Project[]>([]);
  isLoading = signal(true);
  projects = computed(() => {
    const currentId = this.team_id(); // ← חובה ()
  
    if (currentId === null) {
      return this.allProjects();
    }
  
    const targetId = Number(currentId);
  
    return this.allProjects().filter(p => {
      const projectTeamId = Number(p.team_id ?? (p as any).teamId);
      return projectTeamId === targetId;
    });
  });
  
  // projects = computed(() => {
  //   // const currentId = this.team_id();
  //   const currentId =  Number(this.team_id ?? (this as any).teamId);;
  //   if (currentId === null) return this.allProjects();
  
  //   const targetId = Number(currentId); // המרה למספר של ה-ID מה-URL
  
  //   return this.allProjects().filter(p => {
  //     // חילוץ ה-ID מהפרויקט והמרה למספר (מטפל גם ב-team_id וגם ב-teamId)
  //     const projectTeamId = Number(p.team_id ?? (p as any).teamId);
      
  //     return projectTeamId === targetId;
  //   });
  // });
  // projects = computed(() => {
  //   console.log('Signal allProjects currently has:', this.allProjects());
  //   return this.allProjects(); // זמנית מחזירים הכל בלי פילטר כדי לראות אם משהו מוצג
  // });
  // projects = computed(() => {
  //   // 1. קריאת הערך מהסיגנל עם סוגריים ()
  //   const rawId = this.team_id(); 
    
  //   // 2. בדיקה אם יש ערך
  //   if (rawId === null || rawId === undefined) return this.allProjects();
  
  //   const targetId = Number(rawId);
  
  //   return this.allProjects().filter(p => {
  //     // 3. חילוץ ה-ID מהפרויקט (מהשרת זה תמיד team_id)
  //     const pTeamId = p.team_id ?? (p as any).teamId;
  //     return Number(pTeamId) === targetId;
  //   });
  // });
 
 

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.isLoading.set(true);
  
    this.projectService.getProjects().subscribe({
      next: (data) => {

        this.allProjects.set([...data]);
        this.isLoading.set(false);
        console.log('Total projects before filter:', data.length);
        console.log('Projects after filter:', this.projects().length);
      },
      error: () => this.isLoading.set(false)
    });
  }
  onclickCreateProject() {
    const currentId = this.team_id();
  
    this.projectDialogService.openCreateProjectDialog(currentId).subscribe(result => {
      // אנחנו בודקים אם קיבלנו אובייקט (הפרויקט החדש)
      if (result && typeof result === 'object') {

        const normalizedProject: Project = {
          ...result,
          team_id: result.team_id ?? result.teamId
        };
      
        this.allProjects.update(list => [...list, normalizedProject]);
        this.loadProjects();
      } else if (result ) {
        // גיבוי: אם הדיאלוג החזיר רק 'true', נבצע טעינה מלאה מהשרת
        this.loadProjects();
      }
    
      
    });
  }
  // onclickCreateProject() {
  //   const currentId = this.team_id() ?? null;
  
  //   // פתיחת הדיאלוג דרך השירות
  //   this.projectDialogService.openCreateProjectDialog(currentId).subscribe(result => {
  //     // result יהיה true רק אם בתוך CreateProject כתבת this.dialogRef.close(true)
  //     if (result) {
  //       console.log('Project created, refreshing list for team:', currentId);
  //       // this.loadProjects(); // קריאה לשרת להבאת הרשימה המעודכנת
  //       this.allProjects.update(list => [...list, result]);
  //     }
  //   });
  // }
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