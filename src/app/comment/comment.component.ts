import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
  
})

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class CommentComponent implements OnInit {

  @Input() comments: any
  CommentData: any
  constructor() { }

  ngOnInit() {
    this.CommentData = this.comments
  }

  toggleComment()
  {
      this.CommentData.hide_score = !this.CommentData.hide_score    
  }

}



