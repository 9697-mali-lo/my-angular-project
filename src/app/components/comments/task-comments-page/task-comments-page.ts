import { Component, inject, signal, OnInit, input, effect } from '@angular/core';
import { CommentList } from '../comment-list/comment-list';
import { CommentInput } from '../comment-input/comment-input';
import { commentService, Comment } from '../../../services/comment';

@Component({
  selector: 'app-task-comments-page',
  standalone: true,
  imports: [CommentList, CommentInput],
  templateUrl: './task-comments-page.html',
  styleUrl: './task-comments-page.css',
})
export class TaskCommentsPage implements OnInit {
  private taskService = inject(commentService);

  // הגדרת ה-ID של המשימה כ-Input (יכול להגיע מהראוטר)
  taskId = input.required<number>();
  
  // סיגנל שמחזיק את רשימת התגובות
  comments = signal<Comment[]>([]);

  constructor() {
    // בכל פעם שה-taskId משתנה, נטען את התגובות מחדש
    effect(() => {
      this.loadComments(this.taskId());
    });
  }

  ngOnInit() {
    this.loadComments(this.taskId());
  }

  loadComments(id: number) {
    this.taskService.getCommentsByTaskId(id).subscribe({
      next: (data) => this.comments.set(data),
      error: (err) => console.error('Failed to load comments', err)
    });
  }

  handleNewComment(commentText: string) {
    this.taskService.addComment(this.taskId(), commentText).subscribe({
      next: () => {
        // טעינה מחדש של התגובות כדי לראות את התגובה החדשה
        this.loadComments(this.taskId());
      }
    });
  }
}