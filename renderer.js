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
