# aesthetica

aesthetica.herokuapp.com

## Tech Used: Postgres, Express, React, Node, JWT Token, Compound Components, REST API, Styled Components

## Introduction:
![mainpg](https://user-images.githubusercontent.com/72999528/162895713-9f136e29-7d3f-4463-81cb-df947800e943.JPG)

Aesthetica is a learning project and will not be used for any commercial purposes. The art featured in this project is not my own and will not be used for commercial purposes.
This is a Heroku project - please be patient to allow for it to load! 

This project is still in progress.


This is a full-stack IMDb style database meets Reddit application for lovers of niche media.
Users can browse content without signing up, but to like, comment, add posts to list or add
their own content they need to sign up (implemented via JWT token). Users can upvote and
downvote posts, add new content to the database (I built a small scraper in order to fetch
data from a user provided link), remove their posts, make comments, as well as edit and delete
their comments. This app supports nested comments and features multiple filters to navigate
through the content easier.

## Features:

### Nested Comments Using Recursion -
![nested](https://user-images.githubusercontent.com/72999528/164882814-f813ecb4-d035-4625-96de-63ee2332ffce.JPG)

### Responsive/Mobile View
![mobile](https://user-images.githubusercontent.com/72999528/164882844-b31eb68e-77e6-402b-bca5-6bfe58f01b9b.JPG)

### Users Can Contribute Content -

I wrote a scraper to scrape user inputted links:  
Steam link for games  
Amazon link for books  
IMDb link for movies/shows  

![contribute](https://user-images.githubusercontent.com/72999528/164882856-04f44a09-6a12-499c-aceb-77a7549c0483.JPG)

### Supports Multiple Filters (by Genre and Medium) -
![filters](https://user-images.githubusercontent.com/72999528/164882942-ed920bba-af8e-45fe-9e28-5dee05b63d96.JPG)

### Upvote/Downvote System Managed Using Postgres - 
![voting](https://user-images.githubusercontent.com/72999528/164883069-d6e9866b-0652-4403-81b5-67146b26e455.JPG)

### Ability to Add/Remove Items From List - 
![mylist](https://user-images.githubusercontent.com/72999528/164883105-18597fa6-46c4-4464-90a8-97822f1289f5.JPG)

