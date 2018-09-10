import { Component, OnInit, Input, Inject } from '@angular/core';
import { listingService } from '../service/listingService.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { catchError } from '../../../node_modules/rxjs/operators';


@Component({
  selector: 'app-feed-entry-details',
  templateUrl: './feed-entry-details.component.html',
  styleUrls: ['./feed-entry-details.component.css']
})
export class FeedEntryDetailsComponent implements OnInit {

  redditData: any[]
  childData: any
  commentData: any
  entryID: string
  subreddit: string
  selftextHTML: string
  ShowNotFound: boolean = false

  constructor(private listingservice: listingService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.entryID = this.route.snapshot.params['id']
    this.subreddit = this.route.snapshot.params['subreddit']
    this.ShowNotFound = false

    var commentURL = "https://www.reddit.com/r/" + this.subreddit + "/comments/" + this.entryID + ".json"

    this.listingservice.FetchRedditChildComments(commentURL)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe(resp => {
        this.redditData = resp
        this.childData = this.redditData[0].data.children[0].data
        this.commentData = this.redditData[1].data.children
        
        this.selftextHTML = this.childData.selftext_html
        if (this.selftextHTML) {
          this.selftextHTML = this.selftextHTML.replace("&lt;!-- SC_ON --&gt;", "").replace("&lt;!-- SC_OFF --&gt;", "")
        }
      })
  }

  handleError(arg0: any): any {
    //console.log("Error : " + arg0)
    this.childData = undefined
    this.commentData = undefined
    this.ShowNotFound = true
  }
}
