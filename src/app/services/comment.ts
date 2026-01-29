import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comment {
  id?: number;
  taskId: number;
  userId: number;
  text: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class commentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/comment'; // וודא שהכתובת תואמת לשרת שלך

  /**
   * שליפת כל התגובות עבור משימה ספציפית
   */
  getCommentsByTaskId(taskId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/tasks/${taskId}/comments`);
  }

  /**
   * הוספת תגובה חדשה למשימה
   */
  addComment(taskId: number, text: string): Observable<Comment> {
    const payload = {
      text: text,
      // בדרך כלל ה-userId מגיע מה-AuthService, כאן נשים 1 כברירת מחדל
      userId: 1, 
      createdAt: new Date()
    };
    return this.http.post<Comment>(`${this.apiUrl}/tasks/${taskId}/comments`, payload);
  }
}