import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentFromServer, CommentToSend } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class commentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/comments'; // וודא שהכתובת תואמת לשרת שלך

  /**
   * שליפת כל התגובות עבור משימה ספציפית
   */
 
  getCommentsByTaskId(taskId: string): Observable<CommentFromServer[]> {
    // אפשרות א': שימוש ב-Query Parameter (הכי סביר לפי מה שביקשת קודם)
    return this.http.get<CommentFromServer[]>(this.apiUrl, {
      params: { taskId: taskId }
    });}
  /**
   * הוספת תגובה חדשה למשימה
   */
  addComment(comment: CommentToSend): Observable<CommentFromServer> {
    // אם אין לך Interceptor, הוסף Headers כאן:
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<CommentFromServer>(`${this.apiUrl}`, comment);
  }

}