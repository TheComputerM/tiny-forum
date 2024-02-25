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

## Entities

### Actors on the scene

- Users: The common users of the app that can engage in discussions on the forum.
- Moderators: The entities that can perform administrative tasks (eg. deleting inappropriate questions and answers, marking questions as duplicate etc)

### Relations

####  User

- *id*: Unique identifier
- *name*: Name of the user
- *email*: Email of the user
- *is_moderator*: Boolean stating if the user is a moderator or not
- *tags*: A set of tags specifying what the user has expertise in
- *created_at*: When the user signed up

#### Post

- *id*: Unique identifier
- *user_id*: The user who make the post
- *title*: The title of the question/post
- *content*: Content with more information on the question in markdown
- *tags*: A set of tags which describe the topics related to the post
- *duplicate*: If not null, points to the post id whose duplicate it is
- *created_at*: When the post was created

#### Tag

- *id*: Unique identifier
- *name*: Short name of the topic (eg. DBMS)
- *description*: Description of the topic the tag relates to (eg. Manage and organize databases)

####  Reply

- *id*: Unique identifier
- *post_id*: The post the reply is aimed at
- *user_id*: The user who made the reply
- *content*: Content with the reply in markdown
- *created_at*: When the reply was made
