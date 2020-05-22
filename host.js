
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');


tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      //'onStateChange': onPlayerStateChange
    }
  });
}

var video = {
  status: null,
  time: 0,
  newUser: false
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  writeUserData(video)
  //event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
/*var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}*/
function stopVideo() {
  player.stopVideo();
}

function pauseVideo() {
    player.pauseVideo();
  }


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBFI-PkseA6TatSwDs68kgT0nY8v2N-uq4",
    authDomain: "party-c1f42.firebaseapp.com",
    databaseURL: "https://party-c1f42.firebaseio.com",
    projectId: "party-c1f42",
    storageBucket: "party-c1f42.appspot.com",
    messagingSenderId: "912849678726",
    appId: "1:912849678726:web:ae3b595076af7355c87c07",
    measurementId: "G-5MD1BV07ND"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Generate a reference to a new location and add some data using push()
  var video = newPostRef.key;



  function writeUserData(video) {
    firebase.database().ref().push({
      video
    });
  }


  function pause(){
    
    video.status='pause';
    console.log(video.status)
    writeUserData(video)
    player.pauseVideo();
 }

 var status;
  function play(){
    
    video.status='play';
    writeUserData(video)
    player.playVideo();
 }
 
 var messagesRef = firebase.database().ref();

 messagesRef.on('child_changed', function(data) {
    var newPost = data.val();
    console.log(newPost)
    if(newPost.status=='play'){
        player.playVideo();
    }
    if(newPost.status=='pause'){
        player.pauseVideo();
    }
    if(newPost.newUser==true){
     player.pauseVideo()
     video.status='pause'
     writeUserData(video)
     console.log('success')
      if (confirm("Accept new User")) {
        video.newUser=false
        video.time=player.getCurrentTime();
        writeUserData(video)
      } else {
        console.log("You Canceled request")
      }

    }
});


  
