
// export interface Task {
//   id?: number;              // נוסף על ידי השרת לאחר היצירה
//   projectId: number;
//   title: string;
//   description: string;
//   status: 'todo' | 'doing' | 'done';
//   priority: 'low' | 'medium' | 'high';
//   assigneeId: number;
//   dueDate: string;          // נשלח כטקסט בפורמט ISO (YYYY-MM-DD)
//   orderIndex: number;
// }

// import { HttpClient, HttpParams } from "@angular/common/http";
// import { inject, Injectable, signal } from "@angular/core";
// import { Observable } from "rxjs";
// import { TaskFromServer, TaskToSend } from "../models/task";

// @Injectable({ providedIn: 'root' })
// export class tasksService {
//   private http = inject(HttpClient);
//   private apiUrl = 'http://localhost:3000/api/tasks';
//   allTasks = signal<TaskFromServer[]>([]);
//   isLoading = signal(false);
//   // עדכון: הוספת פרמטר אופציונלי לסינון
//   // getTasks(projectId?: number): Observable<TaskFromServer[]> {
//   //   let params = new HttpParams();
//   //   if (projectId) {
//   //     params = params.set('projectId', projectId.toString());
//   //   }
//   //   // שליחת הבקשה עם הפרמטרים: ?projectId=1
//   //   return this.http.get<TaskFromServer[]>(this.apiUrl, { params });
//   // }
//   getTasks() {
//     this.isLoading.set(true);
//     // אנחנו מחזירים את ה-Observable כדי שהקומפוננטה תוכל לדעת מתי הטעינה הסתיימה
//     return this.http.get<TaskFromServer[]>(this.apiUrl).pipe(
//       tap(data => {
//         this.allTasks.set(data); // מעדכן את כל מי שמקשיב לסיגנל
//         this.isLoading.set(false);
//       })
//     );
//   }
//   createTask(task: TaskToSend): Observable<TaskFromServer> {
//     return this.http.post<TaskFromServer>(this.apiUrl, task);
//   }
//   // task.service.ts

// // מחיקה
// deleteTask(taskId: number): Observable<void> {
//   return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
// }

// // עריכה (עדכון)
// updateTask(taskId: number, taskData: Partial<TaskFromServer>): Observable<TaskFromServer> {
//   return this.http.put<TaskFromServer>(`${this.apiUrl}/${taskId}`, taskData);
// }
// }
import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable, tap } from "rxjs"; // חובה לייבא את tap
import { TaskFromServer, TaskToSend, TaskUpdatePayload } from "../models/task";

@Injectable({ providedIn: 'root' })
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/tasks';
  
  allTasks = signal<TaskFromServer[]>([]);
  isLoading = signal(false);

  getTasks(): Observable<TaskFromServer[]> {
    this.isLoading.set(true);
    return this.http.get<TaskFromServer[]>(this.apiUrl).pipe(
      tap(data => {
        this.allTasks.set(data);
        this.isLoading.set(false);
      })
    );
  }

  createTask(task: TaskToSend): Observable<TaskFromServer> {
    return this.http.post<TaskFromServer>(this.apiUrl, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateTask(taskId: number, taskData:TaskUpdatePayload): Observable<TaskFromServer> {
    return this.http.patch<TaskFromServer>(`${this.apiUrl}/${taskId}`, taskData);
  }
}