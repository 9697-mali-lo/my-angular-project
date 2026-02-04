
export interface Task {
  id?: number;              // נוסף על ידי השרת לאחר היצירה
  projectId: number;
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
  assigneeId: number;
  dueDate: string;          // נשלח כטקסט בפורמט ISO (YYYY-MM-DD)
  orderIndex: number;
}

import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskFromServer, TaskToSend } from "../models/task";

@Injectable({ providedIn: 'root' })
export class tasksService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/tasks';

  // עדכון: הוספת פרמטר אופציונלי לסינון
  getTasks(projectId?: number): Observable<TaskFromServer[]> {
    let params = new HttpParams();
    if (projectId) {
      params = params.set('projectId', projectId.toString());
    }
    // שליחת הבקשה עם הפרמטרים: ?projectId=1
    return this.http.get<TaskFromServer[]>(this.apiUrl, { params });
  }

  createTask(task: TaskToSend): Observable<TaskFromServer> {
    return this.http.post<TaskFromServer>(this.apiUrl, task);
  }
}