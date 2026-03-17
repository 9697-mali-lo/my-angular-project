export interface CommentToSend {
    taskId: string;
    body: string;
  }


  export interface CommentFromServer {
    id: number;
    body: string;
    task_id: number;
    user_id: number;
    author_name: string;
    created_at: string; // ניתן להשתמש ב-Date אם אתה מבצע המרה, אך ב-JSON זה מגיע כמחרוזת
  }