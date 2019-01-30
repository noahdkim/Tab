/* Initialize Firebase */
var config = {
  apiKey: "AIzaSyBjkYFQB-DX0O9RKf_NFktYiHdHZkSDDX4",
  authDomain: "tab-electron.firebaseapp.com",
  databaseURL: "https://tab-electron.firebaseio.com",
  projectId: "tab-electron",
  storageBucket: "tab-electron.appspot.com",
  messagingSenderId: "784020768295"
};
firebase.initializeApp(config);


function getLoginInfo(){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  console.log("email: " + email);
}

var signInBtn = document.getElementById('signInBtn');
var signUpBtn = document.getElementById('signUpBtn');

signInBtn.addEventListener('click', function()   {
    console.log("signIn function");
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    /* Sign-in current user */
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      /* Output errors to console */
      console.log("Error code: " + error.code + "\nError message: " + error.message);
    });
});

signUpBtn.addEventListener('click', function()   {
    console.log("signUp function");
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    /* Create new user */
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      /* Output errors to console */
      console.log("Error code: " + error.code + "\nError message: " + error.message);
    });
});
