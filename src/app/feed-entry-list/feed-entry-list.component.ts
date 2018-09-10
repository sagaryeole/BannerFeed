import { Component, OnInit, Input } from '@angular/core';
import { listingService } from '../service/listingService.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Feed } from '../model/IChild';
import { ValidateUrl } from './validateURL';
import { catchError } from '../../../node_modules/rxjs/operators';
import { throwError } from '../../../node_modules/rxjs';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-entry-list',
  templateUrl: './feed-entry-list.component.html',
  styleUrls: ['./feed-entry-list.component.css']
})
export class FeedEntryListComponent implements OnInit {
  jsonURL: string
  pagesize: number
  before: string
  after: string
  searchForm: FormGroup
  FeedURL: FormControl
  dataSource: Feed[]
  ShowNotFound: boolean = false
  subreddit: string
  lazy: boolean = false

  constructor(private listingservice: listingService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.pagesize = 10
    this.lazy = false;
    this.ShowNotFound = false
    this.FeedURL = new FormControl('', [Validators.required, ValidateUrl])
    this.searchForm = new FormGroup({
      FeedURL: this.FeedURL
    })
    this.jsonURL = this.FeedURL.value

    if (this.route.snapshot.params['subreddit']) {

      this.subreddit = this.route.snapshot.params['subreddit']
      this.after = this.route.snapshot.params['name']
      this.jsonURL = "https://www.reddit.com/r/" + this.subreddit + ".json"
      this.FeedURL.setValue(this.jsonURL)
      this.lazy = true
    }

    this.callFetchEntry(this.pagesize)
  }

  callFetchEntry(limit: number) {
    if (this.searchForm.valid) {
      limit = !limit ? this.pagesize : limit
      
      if (this.jsonURL.substring(this.jsonURL.length - 5, this.jsonURL.length).toLocaleLowerCase() != ".json") {
        this.jsonURL += ".json"
      }

      this.listingservice.FetchFeeds(this.jsonURL, this.pagesize, this.before, this.after)
        .pipe(catchError(this.handleError.bind(this)))
        .subscribe(res => {
          this.dataSource = res.Feeds
          this.after = res.After
          this.before = res.Before
          this.ShowNotFound = false
        });
    }
  }

  FetchEntry(FormValue) {
    this.after = this.before = null
    this.jsonURL = FormValue.FeedURL
    this.callFetchEntry(this.pagesize)
  }

  pagesizechange(pagesize: number) {
    this.pagesize = pagesize
    this.after = this.before = null
    this.callFetchEntry(this.pagesize)
  }

  pageChange(navigation: string) {

    if (navigation == 'Next') {
      this.before = null
      this.callFetchEntry(this.pagesize)
    }
    else {
      this.before = this.dataSource[0].Name.toString()
      this.after = null
      if (this.before || this.after) {
        this.callFetchEntry(this.pagesize)
      }
    }
  }

  fillURL() {
    this.lazy = !this.lazy
    this.FeedURL.setValue(this.lazy ? "https://www.reddit.com/r/{Topic Name}" : "")

  }

  handleError(arg0: any): any {
    //console.log("Error : " + arg0)
    this.dataSource = undefined
    this.ShowNotFound = true
  }
}
