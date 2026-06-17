
import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
// ייבוא MatDialogRef כדי שנוכל לסגור את החלון של עצמנו
import { MatDialogRef, MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from "@angular/material/icon"; 
import { MatButtonModule } from '@angular/material/button';
import { TeamsService } from '../../../services/teamServices';

@Component({
  selector: 'app-create-team',
  standalone: true, // וודא שזה קיים
  imports: [FormsModule,
     MatDialogActions,
      MatDialogContent,
      MatDialogModule,
       MatIcon,
       MatIconModule,  
       MatButtonModule,
       ],
  templateUrl: './create-team.html',
  styleUrl: './create-team.css',
})
export class CreateTeam {
  name: string = '';
  description: string = '';
  teamsService=inject(TeamsService);
  // הזרקת ה-Ref של הדיאלוג הנוכחי
  private dialogRef = inject(MatDialogRef<CreateTeam>);

  oncreateTeam() {
    this.teamsService.createTeam(this.name).subscribe({
      next: (response) => {
        // 1. סגירת החלון
        // 2. שליחת ערך true כדי ש-TeamList יבצע loadTeams()
        this.dialogRef.close(true); 
        alert('הצוות ' + this.name + ' נוצר בהצלחה!');
      },
      error: (err) => {
        alert('חלה שגיאה ביצירת הצוות.');
      }
    });
  }
}