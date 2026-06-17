import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
export interface Project {
  id?: number;
  name: string;
  description: string;
  // שניהם קיימים כדי לתמוך גם בשליחה וגם בקבלה
  teamId?: number | null; 
  team_id?: number | null;
}

@Injectable({ providedIn: 'root' })
export class projectsService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/projects`;

    getProjects() {
        return this.http.get<Project[]>(this.apiUrl);
    }

    /**
     * יצירת פרויקט חדש. 
     * הטיפוס Project כעת תואם למה שנשלח מהקומפוננטה (כולל null).
     */
    createProject(proj: Project) {
        return this.http.post<Project>(this.apiUrl, proj);
    }
}