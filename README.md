<br>

I was just tired to build up a project every time I wanted to create a web service, so I've decided to create a template. 
This is a fully working application, backend and frontend you can deploy in your Google Firebase. 
```
    FirebaseTool 8.x
    Angular 9.x
    NodeJS 14.x
```

Just follow the instructions, and you will have a nice starting point for your web application.


# LET'S START

### SETUP
* Download and extract the zip file of the project from github repo https://github.com/stuckDaemon/firebase-template 
* Rename the folder from `firebase-template-master` to `[PROJECT_NAME]` (whichever you want to use of course)
* Open it with IntelliJ

### RENAMING
* Search and replace each occurrence of `firebase-template` with `[PROJECT_NAME]` (brutal replacement will work)
* Search and replace each occurrence of `armocromiaApp` with `[PROJECT_NAME]App` (brutal replacement will work)

### GOOGLE FIREBASE

Basics
* Go to https://firebase.google.com
* Create a new project `[PROJECT_NAME]`
* Upgrade project plan to `Blaze` (mandatory to deploy backend services). You can downgrade afterwards.

Auth keys
* Select the gear icon on the right of  `Project Overview` 
* Open `project settings` and then `Service account` tab
* Click the button `Generate new private key` and download the file
* Save the json file just downloaded in `functions` folder and rename it as `[PROJECT_NAME]-firebase-adminsdk`

Database 
* Open Cloud Firestore from the left column
* Create a new database 
* Create a new collection `foos` and its first element (choose random values) with these fields
```
    id: auto-ID;
    created_at: timestamp;
    modified_at: timestamp;
    name: text;
    email: text;
    text: text;
```


### FINALIZE
* Go to the project root and run
  ```
    $ firebase use --add
  ```
* You will be prompted the list of your projects in firebase. Choose the one you want to add
* Remove this git origin and add yours 
    ``` 
    $ git remote remove origin
    $ git remote add origin [YOUR_REPO_URL]
    ```
* Resolve the project dependencies
    ```
    $ npm i
    $ cd functions 
    $ npm i 
    $ cd ..
    ```
  
### BUILD AND DEPLOY
* Build the project
    ```
    $ ng build --prod && firebase deploy
  ```
* Visit the URL the CLI is showing you.

### DONE!

 ---
 ---

When you are playing around with the code, you can run the backend with
```
$ firebase emulators:start
```
and the frontend with 
``` 
$ ng serve 
```
