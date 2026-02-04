
import { Component, inject, signal, OnInit, computed, input } from '@angular/core'; // הוספנו OnInit
import { ProjectList } from "../project-list/project-list";
import { ProjectDialogService } from '../../../services/ProjectDialogService';
import { ActivatedRoute } from '@angular/router';
import { Project, projectsService } from '../../../services/projectService';

@Component({
  selector: 'app-project-board',
  standalone: true, // וודא שזה מוגדר אם אתה משתמש ב-imports
  imports: [ProjectList],
  templateUrl: './project-board.html',
  styleUrl: './project-board.css',
})
export class ProjectBoard implements OnInit { // הוספנו implements
  private projectDialogService = inject(ProjectDialogService);
  private route = inject(ActivatedRoute);
  private projectService = inject(projectsService);
  team_id = input<number | null, string | number | null | undefined>(null, {
    transform: (value) => (value !== null && value !== undefined ? Number(value) : null)
  });

  currentTeamId = signal<number | null>(null);
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
 
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const teamId = params.get('teamId');
  
      if (!teamId || isNaN(Number(teamId))) {
        console.warn('Invalid teamId, abort ProjectBoard load');
        return;
      }
  
      this.currentTeamId.set(Number(teamId));
    });
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
    // כאן נשלח הערך לחלונית הדיאלוג
    const teamIdValue = this.currentTeamId();
    
    this.projectDialogService.openCreateProjectDialog(teamIdValue).subscribe(result => {
      if (result) {
        console.log('הפרויקט נוצר עבור צוות מספר:', teamIdValue);
        // כאן תוכל להוסיף לוגיקה לרענון הרשימה אם צריך
        this.loadProjects();
      }
    });
  }
}

function ngOnInit() {
  throw new Error('Function not implemented.');
}
