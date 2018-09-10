import { Component, OnInit, Input } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-feed-entry',
  templateUrl: './feed-entry.component.html',
  styleUrls: ['./feed-entry.component.css']
})
export class FeedEntryComponent implements OnInit {

  // @Input() child: IChildren
  @Input() child: any
 
  constructor(private routes:Router) { 
  }

  ngOnInit() {
    
  }
}
