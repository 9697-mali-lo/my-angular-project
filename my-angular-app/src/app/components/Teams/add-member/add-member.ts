
// import { Component, inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
// import { FormsModule } from '@angular/forms';
// import { Team, TeamsService } from '../../../services/teamServices';

// @Component({
//   selector: 'app-add-member',
//   imports: [MatDialogActions, MatDialogContent,FormsModule],
//   templateUrl: './add-member.html',
//   styleUrl: './add-member.css',
// })
// export class AddMember {
//   teamsService=inject(TeamsService)
//   data = inject(MAT_DIALOG_DATA); 

//   private dialogRef = inject(MatDialogRef<AddMember>);
//   email: string = '';
//   onAddMember(){
//     if (!this.email) return;
//     this.teamsService.addMemberToTeam(this.data.team.id, this.email).subscribe({
//       next: () => {
//         this.dialogRef.close(true); // סגירת הפופ-אפ והחזרת סימן להצלחה
//       },
//       error: (err) => {
//         console.log('Server says:', err.error);
//         console.error(err);
//         alert('חלה שגיאה: ' + (err.error?.error || 'לא ניתן להוסיף חבר'));
//       }
//     });
//   }
// }
import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { TeamsService } from '../../../services/teamServices';
 import { UsersService, User } from '../../../services/usersService'; // הנחת עבודה שיש שירות כזה
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; // הוספת Select
import { MatButtonModule } from '@angular/material/button';
// import { User, UsersService } from '../../../services/UsersService';
UsersService
@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [
    MatDialogActions, 
    MatDialogContent, 
    FormsModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatButtonModule
  ],
  templateUrl: './add-member.html',
  styleUrl: './add-member.css',
})
export class AddMember implements OnInit {
  private teamsService = inject(TeamsService);
  private usersService = inject(UsersService); // הזרקת שירות המשתמשים החדש
  private dialogRef = inject(MatDialogRef<AddMember>);
  data = inject<{ team_id: number }>(MAT_DIALOG_DATA);

  // רשימת המשתמשים מה-API
  allUsers = signal<User[]>([]);
  
  // השדות לשליחה
  selectedUserId: number | null = null;
  role: string = 'member';

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => this.allUsers.set(users),
      error: (err) => console.error('Failed to load users', err)
    });
  }

  onAddMember() {
    if (!this.selectedUserId) return;

    const payload = {
      userId: this.selectedUserId,
      role: this.role
    };

    this.teamsService.addMemberToTeam(this.data.team_id, payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => alert('שגיאה: ' + (err.error?.message || 'לא ניתן להוסיף חבר'))
    });
  }
}