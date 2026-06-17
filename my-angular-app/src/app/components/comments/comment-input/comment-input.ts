import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comment-input.html',
  styleUrl: './comment-input.css'
})
export class CommentInput {
  text = signal('');
  onSend = output<string>();

  emitSend() {
    const val = this.text().trim();
    if (val) {
      this.onSend.emit(val);
      this.text.set('');
    }
  }
}