// 1. ייבוא כלים מליבת Angular ומהמודול של HTTP
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/team';

export interface AddMemberPayload {
  userId: number;
  role: string;
}
// 3. דקורטור שאומר ל-Angular: "זהו שירות שניתן להזריק אותו לקומפוננטות אחרות"
@Injectable({ providedIn: 'root' })
export class TeamsService {
  
  // 4. הזרקת שירות ה-HttpClient המאפשר לבצע בקשות לרשת
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/teams';
  // 5. פונקציה למשיכת כל הצוותים מהשרת
  getTeams() {
    // מחזירה Observable של מערך צוותים. 
    // בזכות ה-Interceptor, הטוקן יתווסף לבקשה הזו אוטומטית.
    return this.http.get<Team[]>(this.apiUrl);
  }

  // 6. פונקציה ליצירת צוות חדש
  createTeam(name: string) {
    // שולחת בקשת POST לשרת עם שם הצוות בתוך גוף הבקשה (Body)
    return this.http.post<Team>(this.apiUrl, { name });
  }
  // addMemberToTeam(teamId: number, {userId: number,
  //   role:string}) 
  addMemberToTeam(teamId: number, memberData: AddMemberPayload) {
    // בדרך כלל ב-REST API הנתיב נראה כך: /api/teams/:teamId/members
    const url = `${this.apiUrl}/${teamId}/members`;
    // return this.http.post(`${this.apiUrl}/${teamId}/members`, {userId: email });
    return this.http.post(url, memberData);
  
}
 }