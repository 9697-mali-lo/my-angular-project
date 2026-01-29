import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team, TeamsService } from '../../../services/teamServices';
import { UpperCasePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { CreateTeam } from '../create-team/create-team';
// ייבוא רכיבי Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddMember } from '../add-member/add-member';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
 import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list',
  imports: [
    MatMenuModule,
    UpperCasePipe,
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './team-list.html',
  styleUrl: './team-list.css',
})
export class TeamList {
private router=inject(Router);
goToTeamProjects(teamId: string) {
  this.router.navigate(['/projects', teamId]);
}
openAddMemberDialog(team: Team) {
  const dialogRef = this.dialog.open(AddMember, {
    width: '580px',
    data: { team_id: team.id }
  });

  // האזנה לסגירת הדיאלוג - אם הוחזר true, נרענן את הרשימה
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loadTeams(); // זה יעדכן את ה-membersCount מהשרת
    }
  });
}
  private teamsService = inject(TeamsService);
  private dialog = inject(MatDialog);
openCreateTeamDialog() {
    const dialogRef = this.dialog.open(CreateTeam, {width: '580px',});

    // אחרי שהפופ-אפ נסגר, נרצה לרענן את הרשימה כדי לראות את הצוות החדש
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // אם החזרת ערך מהפופ-אפ (למשל true כשהצליח)
        this.loadTeams(); 
      }
    });
  }

  teams = signal<Team[]>([]);
  isLoading = signal(true);
  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    this.isLoading.set(true);
    this.teamsService.getTeams().subscribe({
      next: (data) => {
        // יצירת מערך חדש לגמרי [...data] מבטיחה ש-Angular ירענן את התצוגה
        this.teams.set([...data]); 
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
}
