Tab Design
===

Tab provides flexibility to users that other to-do lists do not by allowing users to create custom fields associated with tasks. The app also allows users to organize tasks by date and creates a calendar “heatmap” which shows what dates have the most unfinished tasks. This simplifies prioritization and helps users complete tasks on time.

## Goals/Requirements
What we propose to do is create an application that will do the following:
* The system shall allow a user to create an account either using OAuth or their email address as their unique identifier.
* The system shall allow a user to create multiple lists
  * User can establish what fields are associated with tasks within a list
    * User can select fields from existing list templates
    * User can create custom fields
* The system shall allow a user to create their own list templates
  * User can copy from an existing template
  * User can add or delete fields
  * User can name fields with alphanumeric characters
  * User can select the field’s value type (e.g. date, time, text, numeric, boolean)
* The system shall allow a user to interact with a calendar.
User can display their list items on the calendar.
User can change the view of the calendar (e.g. day, week, month)

## Existing Solutions

**[Evernote](https://evernote.com/)** - Primarily a note-taking app. Evernote “allows users to create notes, which can be formatted text, web pages or web page excerpts, photographs, voice memos, or handwritten "ink" notes. Notes can also have file attachments.” (https://en.wikipedia.org/wiki/Evernote)

* **What we like:** Evernote offers a lot of flexibility in styling and formatting   
* **What we don’t like:** Not primarily a to-do list app. Lots of bloat if you want to use it as purely a to-do list app

**[Google Keep](https://keep.google.com)** - Flexible minimal note-taking app. Supports text, image, and audio notes.

* **What we like:** Minimalist and not overwhelming. Very easy to take basic notes and create basic checklists (like grocery lists). Good web and mobile integration.  
* **What we don’t like:** Lacks feature to check off all lists, give tasks a due date, etc. No list of lists, no organized way to find a specific list except by using labels.

**[Todoist](https://todoist.com/)** - Primarily a to-do list app. Todoist is a task management software for simple tasks or intensive collaborative projects

* **What we like:** Todoist is probably the best note-taking app I’ve used. It’s very simple and organized.  Very clean material design.  
* **What we don’t like:** Can’t tell when apps are due relative to each other. No ability to add fields/information. Not easy to group by date (other than today, 7 days)

## Proposed Solution
Our solution is a cross-platform application that allows users to create new lists with custom fields.

### Technologies
[Electron](https://electronjs.org/) - an open-source framework developed and maintained by GitHub. Electron will allow for the development of cross-platform applications using web technologies. (https://www.alibabacloud.com/blog/what-is-electronjs-and-why-should-you-use-it_581971)

[AWS RDS](https://aws.amazon.com/rds/) - Amazon’s cloud relational database service which offers Aurora, PostgreSQL, MySQL, etc. It will be used to store todo-list data in database tables.


[Google Firebase](https://firebase.google.com/) - Firebase will be used for login functionality for the application. It supports OAuth 2.0 and custom login implementation. Future mobile app integration is also possible, since Firebase is well supported by Android development.



## Testing
[Spectron](https://electronjs.org/spectron) - Electron’s own open-source framework for testing Electron applications.


[Selenium](https://www.seleniumhq.org/) - A browser automation tool used for automating web applications. It will be used to test the use flow of Tab.


[Travis CI](https://travis-ci.org/) - a continuous integration service for building and testing software. Offers GitHub integration.
