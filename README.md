# play-app-be

## About the Project

A full-stack application, built in two parts. The first is the BackEnd creating an API in Express using Musixmatch's API to 
Respond to a FrontEnd in JavaScript. The full application allows users will utilize to track favorite songs and playlists.

## Local Setup

You'll need to setup an API key with Musixmatch: 
[https://developer.musixmatch.com/documentation](https://developer.musixmatch.com/documentation)

## Deployment

Our app is deployed on heroku at: [https://play-app-nicknaaron.herokuapp.com/](https://play-app-nicknaaron.herokuapp.com/)

## Front-End

Please see [Front-End](https://github.com/NickLindeberg/play-app-fe)


## Contributors

* J Aaron Brooks Roberts  [https://github.com/abroberts5](https://github.com/abroberts5)
* Nick Lindeberg [https://github.com/nicklindeberg](https://github.com/nicklindeberg)

## Built With

## Endpoints

GET https://play-app-nicknaaron.herokuapp.com/api/v1/favorites
- Returns a list of your favorites songs that are stored in the database 

```
[
  {
    "id": 1,
    "song_name": "Cant Wait",
    "artist_name": "Marty",
    "genre": "rock",
    "rating": 88,
    "created_at": "2019-03-23T21:11:37.879Z",
    "updated_at": "2019-03-23T21:11:37.879Z"
  },
  {
    "id": 2,
    "song_name": "Jumping off the Roof",
    "artist_name": "Jimmy",
    "genre": "Terrible Music",
    "rating": 40,
    "created_at": "2019-03-26T20:35:14.167Z",
    "updated_at": "2019-03-26T20:35:14.167Z"
  },
]
```

GET https://play-app-nicknaaron.herokuapp.com/api/v1/favorites/1
  - Get favorite song by id passed in through params
```
[
  {
    "id": 1,
    "name": "Really Cool Song",
    "artist_name": "Josh"
    "genre": "Rock",
    "rating": 77
  }
]
```

POST https://play-app-nicknaaron.herokuapp.com/api/v1/favorites
  - Post to add favorite songs to the database with the following params in the body of your request
```
{
  "favorites": {
    "id": 1,
    "name": "We Will Rock You",
    "artist_name": "Queen"
    "genre": "Rock",
    "rating": 88
  }
}

```

DELETE https://play-app-nicknaaron.herokuapp.com/api/v1/favorites/1
  - Deletes favorite song by id passed in through params
 ```
  * No return value, rerun GET favorites index and favorite is deleted
 ```
 
 GET https://play-app-nicknaaron.herokuapp.com/api/v1/playlists
  - Returns a list of your playlists and their favorites stored in the database 
```
[
  {
     "id": 1,
     "playlist_name": "Favorite songs of all time",
     "favorites": [
       {
         "id": 1,
         "name": "We Will Rock You",
         "artist_name": "Queen"
         "genre": "Rock",
         "rating": 88
       },
       {
         "id": 2,
         "name": "Careless Whisper",
         "artist_name": "George Michael"
         "genre": "Pop",
         "rating": 93
         }
     ]
 },
 {
     "id": 2,
     "name": "Other amazing songs",
     "favorites": [
       {
         "id": 1,
         "name": "We Will Rock You",
         "artist_name": "Queen"
         "genre": "Rock",
         "rating": 88
        },
     ]
 },
]
```

GET https://play-app-nicknaaron.herokuapp.com/api/v1/playlists/:playlist_id/favorites
  - Returns all the favorites associated with the playlist with an id specified by :playlist_id
```
{
   "id": 1,
   "playlist_name": "Favorite songs of all time",
   "favorites": [
     {
       "id": 1,
       "name": "We Will Rock You",
       "artist_name": "Queen"
       "genre": "Rock",
       "rating": 88
     },
     {
       "id": 2,
       "name": "Careless Whisper",
       "artist_name": "George Michael"
       "genre": "Pop",
       "rating": 93
       }
    ]
 },
```

POST https://play-app-nicknaaron.herokuapp.com/api/v1/playlists/:playlist_id/favorites/:id
 - Adds the favorite with :id to the playlist with :playlist_id. This creates a new record in the Playlist Favorites table to establish the relationship between this song favorite and playlist.
```
{
  "message": "successfully added"
}
```
