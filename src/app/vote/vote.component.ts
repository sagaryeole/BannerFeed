import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  @Input() Score: any

  originalScore: number
  constructor() { }

  ngOnInit() {
    this.originalScore = this.Score
  }


  addVote(vote: number) {
    if (vote == 1 && this.Score <= this.originalScore) {
      this.Score = this.Score + vote
    }
    if (vote == -1 && this.Score >= this.originalScore) {
      this.Score = this.Score + vote
    }
  }
}
