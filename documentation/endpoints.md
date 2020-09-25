# Endpoints
"/"
Action: Get
Notes: renders homepage (see MVP)

"/signup"
Action: Post
Notes: Directs to a page with NavBar and form to sign up below navbar
Includes
  csrfprotection
  First Name input
  Last Name input
  email input
  username input
  password input
  confirm password input
  submit button

"/login"
Action: Post
Notes: Directs to a page containing NavBar and form to log in below navbar
Includes
  csrfprotection
  email input
  password input
  submit button

"/about"
Action: Get
Notes: renders about page (see MVP)

"/articles"
Action: GET
Notes: sends fetch request to "/api/articles" and renders a page listing all articles as links (https://en.wikipedia.org/w/index.php?title=Special:AllPages&from=%22Archaeological+Museum+of+Iran%22)

"/api/articles"
Action: GET
Notes: queries DB and sends back the titles & urls to articles

"/articles/:id"
Action: GET
Notes: sends API request to "/api/articles/:id" and renders specific article from response

"/api/articles/:id"
Action: GET
Notes: sends article from DB

"/api/articles/:id"
Action:
Notes: Renders specific article

"/articles/:id/edit"
Action: get
Notes: directs to a page to edit specific article

"/api/articles/:id/edit"
Action: post
Notes: updates article in DB with edits

"/articles/create"
Action: Get
Notes: directs to a page to create a new article

"/api/articles/create"
Action: Post
Notes: Creates an article from "/articles/create" page's form & enters to DB
