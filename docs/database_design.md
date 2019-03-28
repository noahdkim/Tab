Database Design
===

Because we're using Firebase, we must learn how to effectively utilize a
non-relational (NoSQL) data structure.

Because fetching data from Firebase will also fetch all of its children nodes,
it's imperative that we avoid nesting data. The official Firebase site has a
good explanation about best practices https://firebase.google.com/docs/database/ios/structure-data.

## Our Design
We will have three main collections:
* Authorization
    * User information (email, password, UID etc.)
* Meta information for lists
    * Document for each UID
        * Collection of Group Lists (group_lists)
            * Group Document
                * Field: Group name
                * Collection of Lists
                    * Field: List name
                    * Field: List ID
        * Collection of Personal Lists (personal_lists)
            * Field: List name
            * Field: List ID
* List Content
    * List (by ID)
        * Field: Name of List
        * Field: Collection of List Items
