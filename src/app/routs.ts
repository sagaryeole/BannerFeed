import { Routes } from '@angular/router'
import { FeedEntryListComponent } from './feed-entry-list/feed-entry-list.component';
import { FeedEntryDetailsComponent } from './feed-entry-details/feed-entry-details.component';
import { Error404Component } from './error/error404.component';



export const appRouts: Routes = [

    { path: 'feed', component: FeedEntryListComponent},
    { path: 'feed/:subreddit/:name', component: FeedEntryListComponent},
    { path: 'feed/details/:subreddit/:id', component: FeedEntryDetailsComponent },
    { path: '', redirectTo: '/feed', pathMatch: 'full' },
    { path: '404', component: Error404Component },

]