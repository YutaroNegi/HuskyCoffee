// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDoq3nb0zsH3Wy59mNvX9ubrfLszpkyXUk",
    authDomain: "huskycoffee-4f5a4.firebaseapp.com",
    projectId: "huskycoffee-4f5a4",
    storageBucket: "huskycoffee-4f5a4.appspot.com",
    messagingSenderId: "180522859960",
    appId: "1:180522859960:web:65440262d8bf566f0ce34d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore()
var auth = firebase.auth()