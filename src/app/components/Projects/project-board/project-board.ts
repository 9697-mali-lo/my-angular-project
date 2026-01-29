// import { Component, inject, signal } from '@angular/core';
// import { ProjectList } from "../project-list/project-list";
// import { CreateProject } from '../create-project/create-project';
// import { MatDialog } from '@angular/material/dialog';
// import { ProjectDialogService } from '../../../services/ProjectDialogService';
// import { ActivatedRoute } from '@angular/router';
// CreateProject

// @Component({
//   selector: 'app-project-board',
//   imports: [ProjectList],
//   templateUrl: './project-board.html',
//   styleUrl: './project-board.css',
// })
// export class ProjectBoard {
//   private projectDialogService = inject(ProjectDialogService);
//   private route = inject(ActivatedRoute);
//   currentTeamId = signal<number | null>(null);
//   private route = inject(ActivatedRoute);
//   ngOnInit() {
//     // שליפת ה-teamId מה-URL
//     this.route.paramMap.subscribe(params => {
//       const id = params.get('teamId');
//       if (id) {
//         this.currentTeamId.set(Number(id));
//       }
//     });
//   }
// onclickCreateProject(){
// this.projectDialogService.openCreateProjectDialog(this.currentTeamId()).subscribe(result => {
//   if (result) {
//     console.log('הפרויקט נוצר');
//   }
// });
// }
// }
import { Component, inject, signal, OnInit } from '@angular/core'; // הוספנו OnInit
import { ProjectList } from "../project-list/project-list";
import { ProjectDialogService } from '../../../services/ProjectDialogService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-board',
  standalone: true, // וודא שזה מוגדר אם אתה משתמש ב-imports
  imports: [ProjectList],
  templateUrl: './project-board.html',
  styleUrl: './project-board.css',
})
export class ProjectBoard implements OnInit { // הוספנו implements
  private projectDialogService = inject(ProjectDialogService);
  private route = inject(ActivatedRoute);
  
  currentTeamId = signal<number | null>(null);

  ngOnInit() {
    // שליפת ה-teamId מה-URL (projects/:teamId)
    this.route.paramMap.subscribe(params => {
      const id = params.get('teamId');
      if (id) {
        this.currentTeamId.set(Number(id));
      }
    });
  }

  onclickCreateProject() {
    // כאן נשלח הערך לחלונית הדיאלוג
    const teamIdValue = this.currentTeamId();
    
    this.projectDialogService.openCreateProjectDialog(teamIdValue).subscribe(result => {
      if (result) {
        console.log('הפרויקט נוצר עבור צוות מספר:', teamIdValue);
        // כאן תוכל להוסיף לוגיקה לרענון הרשימה אם צריך
      }
    });
  }
}