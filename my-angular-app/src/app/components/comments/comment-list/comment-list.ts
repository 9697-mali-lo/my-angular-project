import { Component, input } from '@angular/core';
import { CommentItem } from '../comment-item/comment-item';
import { CommentFromServer } from '../../../models/comment';
@Component({
  selector: 'app-comment-list',
  imports: [CommentItem],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.css',
})
export class CommentList {
  comments = input.required<CommentFromServer[]>();
}
