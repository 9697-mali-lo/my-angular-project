// comment-item.ts
import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common'; // ייבוא ה-Pipe
import { Comment } from '../../../services/comment';

@Component({
  selector: 'app-comment-item',
  standalone: true, // וודאי שזה מוגדר
  imports: [DatePipe], // חובה להוסיף כאן כדי להשתמש ב- | date ב-HTML
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.css',
})
export class CommentItem {
  comment = input.required<Comment>();
}