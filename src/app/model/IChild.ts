
export class FeedList {
    constructor(public After?: string,
        public Before?: string,
        public Feeds?: Feed[]) { }
}


export class Feed {
    constructor(public AuthorDetails: Author,
        public Title: String,
        public Thumbnail: Thumbnail,
        public Num_comments: Number,
        public Score: Number,
        public Created: Number,
        public Permalink: String,
        public Url: String,
        public SubReddit: String,
        public Id: String,
        public Name: String,
        public Text?: String,//self text
        public Replies?: Feed[]
    ) { }
}
 
export class Thumbnail {
    constructor(public Url?: String | null,
        public Width?: Number | null,
        public Height?: Number | null) { }
}

export class Author {
    constructor(public AuthorName: String,
        public AuthorFlairText?: String) { }
}
