// 1. ייבוא כלים מליבת Angular ומהמודול של HTTP
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface User {
  id: string;
  name: string;
}

// 3. דקורטור שאומר ל-Angular: "זהו שירות שניתן להזריק אותו לקומפוננטות אחרות"
@Injectable({ providedIn: 'root' })
export class UsersService {
  
  // 4. הזרקת שירות ה-HttpClient המאפשר לבצע בקשות לרשת
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/users';
  // 5. פונקציה למשיכת כל הצוותים מהשרת
  getUsers() {
    // מחזירה Observable של מערך צוותים. 
    // בזכות ה-Interceptor, הטוקן יתווסף לבקשה הזו אוטומטית.
    return this.http.get<User[]>(this.apiUrl);
  }

//   addMemberToTeam(teamId: string, email: string) {
//     return this.http.post(`${this.apiUrl}/${teamId}/members`, {userId: email });
//   }
}