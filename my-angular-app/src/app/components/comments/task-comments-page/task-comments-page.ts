import { Component, inject, signal, OnInit, input, effect } from '@angular/core';
import { CommentList } from '../comment-list/comment-list';
import { CommentInput } from '../comment-input/comment-input';
import { commentService } from '../../../services/comment';
import { CommentFromServer } from '../../../models/comment';

@Component({
  selector: 'app-task-comments-page',
  standalone: true,
  imports: [CommentList, CommentInput],
  templateUrl: './task-comments-page.html',
  styleUrl: './task-comments-page.css',
})
export class TaskCommentsPage {
  private taskService = inject(commentService);

  // הגדרת ה-ID של המשימה כ-Input (יכול להגיע מהראוטר)
  taskId = input.required<string>();
  
  // סיגנל שמחזיק את רשימת התגובות
  comments = signal<CommentFromServer[]>([]);

  constructor() {
    // בכל פעם שה-taskId משתנה, נטען את התגובות מחדש
    effect(() => {
      this.loadComments(this.taskId());
    });
  }

  loadComments(id: string) {
    this.taskService.getCommentsByTaskId(id).subscribe({
      next: (data) => this.comments.set(data),
      error: (err) => console.error('Failed to load comments', err)
    });
  }

  handleNewComment(commentText: string) {
    const dataToSend = { 
      taskId: this.taskId(), 
      body: commentText 
  };
  
    this.taskService.addComment(dataToSend).subscribe({
      next: (newComment) => {
        // עדכון ה-Signal באופן מקומי במקום קריאה נוספת לשרת
        this.comments.update(allComments => [...allComments, newComment]);
      },
      error: (err) => console.error('Error adding comment', err)
    });
  }
}