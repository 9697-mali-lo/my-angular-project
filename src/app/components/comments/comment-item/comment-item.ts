import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
 import{Comment }from '../../../services/comment'
@Component({
  selector: 'app-comment-item',
  imports: [],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.css',
})
export class CommentItem {

  comment = input.required<Comment>();
  date=this.comment;
  
}
