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

`[
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
]`

