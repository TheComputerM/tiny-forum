# Tiny Forum

## Team members:

- Mudit Somani (2022A7PS0149H)
- Eshaan Sudan (2022A7PS0075H)
- Praharsh Vitta (2022A7PS0015H)
- Varun Reddy (2022A7PS0010H)
- V S Saitej Samudrala (2022A7PS0241H) 

------

## Scenario 

The mini-world of this project contains and represents the actions needed for a user to engage in discussions with their community. By creating a forum, we have a central knowledge base of all the conversations which future generations can inherit. Having a record of the data reduces  the scope of human error and also makes it easier to filter/search data so there is increased productivity overall.

## Actors and Entities

### Actors on the scene

- **Users**: The common users of the app that can engage in discussions on the forum.The users can comment and react on comments of a post and make posts to ask their queries.

- **Moderators**: The entities that can perform administrative tasks (eg. deleting inappropriate questions and answers, marking questions as duplicate etc)

### Entities

####  User 
  > represents a user of the forum.

- *id*: **Primary key**
- *name*: Name of the user
- *email*: Email of the user
- *is_moderator*: Boolean stating if the user is a moderator or not
- *tags*: A set of tags specifying what the user has expertise in
- *created_at*: When the user signed up

> *tags* can be edited by the user or any other user who is a moderator

#### Post
  > represents the query asked by a user.

- *id*: **Primary key**
- *user_id*: The user who make the post
  - Many-to-one (Many posts have one user)
  - **Foreign key** referencing the **id** attribute in the **User** entity.
- *title*: The title of the question/post
- *content*: Content with more information on the question in markdown
- *tags*: A set of tags which describe the topics related to the post
- *duplicate*: If not null, points to the post id whose duplicate it is
  - can only be updated my a user who is a moderator
- *created_at*: When the post was created

> Can be deleted by a user who is a moderator

#### Tag
  > Categorizes posts by subject or user expertise, making it easier to find relevant content.


- *id*: **Primary key**
- *name*: Short name of the topic (eg. DBMS)
- *description*: Description of the topic the tag relates to (eg. Manage and organize databases)

> Tags can be created and deleted by users who are moderators

####  Comment
  > User's response to a post.

- *id*: **Primary key**
- *post_id*: The post the comment is aimed at
  - **Foreign key** referencing the **id** attribute in the **Post** entity.
- *user_id*: The user who made the reply
  - **Foreign key** referencing the **id** attribute in the **User** entity.
- *content*: Content with the reply in markdown
- *created_at*: When the reply was made

> Can be deleted by a user who is a moderator

#### Interactions
  > Reflects user approval and engagement.


- *id*: **Primary key**
- *Interaction*: An enum which can be LIKE or DISLIKE
- *comment_id*: The post the interaction is aimed at
  - **Foreign key** referencing the **id** attribute in the **Comment** entity.
- *user_id*: The user who made the interaction
  - **Foreign key** referencing the **id** attribute in the **User** entity.

## Business Rules

1. User
  - A user entity must contain id, name and email.
  - A user entity must contain information if the user is moderator or not.
  - A user can make multiple posts.
  - A user can comment on other posts and react to the comments on other posts.
  - A user can have multiple tags showing the user's expertise in a particular domain.

2. Post
  - A post must have an id,title and content.
  - A post can have tags expressing the topic of the post.
  - A post can have multiple comments.
  - A post must have a user associated with it.
  - A post can be marked as duplicate by a moderator which in case would contain the link to the orignal post.

3. Moderator
  - A moderator is a user who perfoms administrative tasks.
  - A moderator can mark a post as spam.
  - A moderator can delete a post or comment.
  - A moderator can create new tags and delete existing tags.

4. Tag
  - A tag entity must contain name, id and description of the topic it relates to.
  - A tag can be associated with a user or a post.

5. Comment
  - A comment entity must contain id, content , postid, userid and the time it was created at.
  - A comment must have a user and a post associated to it.


## Relational Mapping








 

