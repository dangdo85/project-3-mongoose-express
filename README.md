# Spotlight API Project 
A social media app that allow users to "SPOTLIGHT" a major current event, a special moment of their day, or just an image that provided a fleeting moment of joy and share it with others.

## User Story
- As an unregistered user, I would like to view all images
- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to upload an image to AWS with a name
- As a signed in user, I would like to update the name of my image on AWS.
- As a signed in user, I would like to see all my images on AWS.
- As a signed in user, I would like to see the thumbnail of all images on AWS.
- As a signed in user, I would like to comment on posts
- As a signed in user, I would like to delete my comments
- As a signed in user, I would like to update my comments
- As a signed in user, I would like to delete the reference of my image from the database.
- As a signed in user, I would like to see the following data for any post:
    - date created/uploaded
    - date modified
    - owner (user who created the post)
    - name

### Stretch Goals
- As an unregistered user, I would like to download any image
- As a signed in user, I would like to 'like' images
- As a signed in user, i would like to follow another user
- As a signed in user, i would like to share another user's post

## Technology
We will be using React for our front end with RESTful routes and Moongose Express for our back end with CRUD actions. The app will use AWS to store the uploaded images, MongoDB Atlas as the database, and Heroku to launch.

## ERD
![](planning/ERD.png)

## Wireframes
![](planning/WireFrames.png)

## Route Table

### Authentication
| Verb   | URI Pattern         | Controller#Action |
| ------ | ------------------- | ----------------- |
| POST   | `/sign-up`          | `users#signup`    |
| POST   | `/sign-in`          | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout `  |

### USER'S POST
| Verb   | URI Pattern | Controller#Action    |
| ------ | ----------- | -------------------- |
| GET    | `/`         | `other users' index` |
| GET    | `/:userId`  | `my index`           |
| POST   | `/`         | `add`                |
| PATCH  | `/:postId`  | `update`             |
| DELETE | `/:postId`  | `destroy`            |

### COMMENT
| Verb   | URI Pattern           | Controller#Action |
| ------ | --------------------- | ----------------- |
| POST   | `/:postId/:commentId` | `add`             |
| PATCH  | `/:postId/:commentId` | `update`          |
| DELETE | `/:postId/:commentId` | `destroy`         |

## Schema
### User
- email: string
    - required
    - unique
- username: string
    - required
    - unique
- hashedPassword: string
    - required
- token: string
- timestamps
    
### Post
- title: string
- caption: string
- image: url(?) w aws
- like: (reach goal)
- follow: boolean (reach goal)
- timestamp:
- owner: mongoose.Schema.Types.ObjectId
    - required

### Comment (sub-schema)
- comment: string (reach goal)

## Development Roles 
- Front-End SME: Trevor Zou
- Back-End SME: Shai Aloni 
- Team Manager: Dang Do