import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Feed, FeedList, Author, Thumbnail } from '../model/IChild';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class listingService {

  constructor(private http: HttpClient) { }

  FetchFeeds(jsonURL: string, limit: number = 25, before: string = null, after: string = null): Observable< FeedList> {
    return this.http.get<FeedList>(jsonURL,
      {
        params: new HttpParams()
          .set('limit', limit.toString())
          .set('before', before)
          .set('after', after)
          .set('count', limit.toString())
      })
      .pipe(
        map(response => {
          //debugger;
          var feedList = {} as FeedList;
          var feeds = [] as Feed[];
          var feed: Feed;
          var authorDetail: Author;
          var thumbnail: Thumbnail;

          if (response) {

            if (response['data'] && response['data']['children']) {

              response['data']['children'].forEach(_feed => {
                authorDetail = new Author(_feed['data']['author']);
                thumbnail = new Thumbnail(_feed['data']['thumbnail'],
                  _feed['data']['thumbnail_width'],
                  _feed['data']['thumbnail_height']);

                feed = new Feed(authorDetail,
                  _feed['data']['title'],
                  thumbnail,
                  _feed['data']['num_comments'],
                  _feed['data']['score'],
                  _feed['data']['created'],
                  _feed['data']['permalink'],
                  _feed['data']['url'],
                  _feed['data']['subreddit'],
                  _feed['data']['id'],
                  _feed['data']['name']
                );

                feeds.push(feed);
              });

              feedList = new FeedList(response['data']['after'],
                response['data']['before'],
                feeds);
            }
          }
          return feedList
        }));

  }

  private LoopThroughFeedHierarchy(arr: any[]): Feed {
    var author: Author;
    var thumbnail: Thumbnail;
    var mainFeed: Feed;
    var subfeeds = [] as Feed[];

    if (arr && arr.constructor === Array && arr['length'] > 0) {
      arr.forEach(_feed => {
        author = new Author(_feed['data']['author']);
        thumbnail = new Thumbnail(_feed['data']['thumbnail'],
          _feed['data']['thumbnail_width'],
          _feed['data']['thumbnail_height']);

        //check if feed has any replies then keep pushing them in 
        if (_feed['data']['replies'] && _feed['data']['replies']['length'] > 0) {
          subfeeds.push(this.LoopThroughFeedHierarchy(_feed['data']['replies']));
        }

        mainFeed = new Feed(author,
          _feed['data']['title'],
          thumbnail,
          _feed['data']['num_comments'],
          _feed['data']['score'],
          _feed['data']['created'],
          _feed['data']['permalink'],
          _feed['data']['url'],
          _feed['data']['subreddit'],
          _feed['data']['id'],
          _feed['data']['name'],
          _feed['data']['selftext'],
          subfeeds);
      });

    }
    return mainFeed;
  }

  FetchFeedDetails(commentURL: string): Observable<Feed> {

    return this.http.get<Feed>(commentURL)
      .pipe(
        map(response => {

          var mainFeed: Feed;
          var comments = [] as Feed[];
          var feed: Feed;
          var authorDetail: Author;
          var thumbnail: Thumbnail;
          if (response && response.constructor === Array && response['length'] > 0) {
            //for main entry

            mainFeed = this.LoopThroughFeedHierarchy(response[0]['data']['children']);

            if (!mainFeed.Replies) {
              mainFeed.Replies = [];
            }

            //for comments entry 
            if (response['length'] == 2) {
              mainFeed.Replies.push(this.LoopThroughFeedHierarchy(response[1]['data']['children']));
            }
          }
          return mainFeed;
        }));
  }

  FetchRedditChildComments(url) {
    return this.http.get<any[]>(url)
  }
}



