
function getUser() {
	fetch('http://localhost:8080/postbook/webapi/twitter/tweets/getAllTweet')
		.then(resp => resp.json())
		.then(data => console.log(data))
}


var userid;
var tweets = [];
var tweetid;

// -------Sign In-------
function SignUp() {

	const users = {
		username: document.getElementById("username").value,
		useremail: document.getElementById("useremail").value,
		password: document.getElementById("password").value,
	}

	fetch("http://localhost:8080/postbook/webapi/twitter/users/add", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(users)
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			alert("Sign Up Sucess...");
			userid = data.userId;
			enableTab();
		});

}


// -----Login---------
function SignIn() {


	const userLogin = {
		userEmail: document.getElementById("useremaillogin").value,
		userPassword: document.getElementById("userpasswordlogin").value,
	}

	fetch("http://localhost:8080/postbook/webapi/twitter/users/login", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userLogin)
	})
		.then((res) => res.json())
		.then((data) => {
			userid = data.userId;
			console.log(userid);
			alert("Login Sucess....");
			enableTab();
		})
		.catch((err) => {
			console.log("Error" + err);
		});

}


//-------Enable tab-------
function enableTab() {
	document.getElementById("feed-tab").removeAttribute('disabled');
	document.getElementById("profile-tab").removeAttribute('disabled');
	document.getElementById("my-tweets-tab").removeAttribute('disabled');

	//document.getElementById("feed-tab-pane").show();
}


//---------------FEED TAB------------------


// ADD TWEET START----------
function addNewTweet() {


	const tweetData = {
		tweetBody: document.getElementById("tweetinput").value,

		user: {
			userId: userid,
		}
	}

	fetch("http://localhost:8080/postbook/webapi/twitter/tweets/add", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(tweetData)
	})
		.then((res) => {tweetList(); res.json()})
		.then(data => {
			console.log(data)
			tweetid=data.tweetId;
			alert("Tweet ADD.")
			
		});

}

// ADD TWEET END-------

// TWEET LIST----------------
function tweetList() {


	//

	fetch("http://localhost:8080/postbook/webapi/twitter/tweets/getAllTweet", {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(resp =>  resp.json())
		.then(data => mapTweet(data))
		
}

function mapTweet(tweets){
	var listString = "";
	
	for(let i=0;i<tweets.length; i++){
		listString +=`<div class="card mb-3" style="max-width: 540px;">
						<div class="row g-0">
							<div class="col-md-4">
								<img src="${tweets[i].user.userAvatar}" class="img-fluid rounded-start" alt="...">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${tweets[i].user.userName}</h5>
									<p class="card-text">${tweets[i].tweetBody}.</p>
									<p class="card-text">
										<small class="text-body-secondary">Likes:${tweets[i].tweetLikes}</small>
									</p>
								</div>
								
							</div>
							
						</div>
					</div>
` 
	}
	
	document.getElementById('tweetsList').innerHTML = listString;
}


// ------------ My Tweets --------------
function myTweets(){
	//var url = "http://localhost:8080/postbook/webapi/twitter/users/getUser";
	
	
	fetch(`http://localhost:8080/postbook/webapi/twitter/tweets/myTweet/${userid}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(resp =>  resp.json())
		.then(data =>{
			console.log(data);
			myTweet(data)
			})
			
}


function myTweet(tweets){
	var listString = "";
	
	
	for(let i=0;i<tweets.length; i++){
		listString +=`<div class="card mb-3" style="max-width: 540px;">
						<div class="row g-0">
							<div class="col-md-4">
								<img src=${tweets[i].user.userAvatar}class="img-fluid rounded-start" alt="...">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${tweets[i].user.userName}</h5>
									<p class="card-text">${tweets[i].tweetBody}.</p>
									<p class="card-text">
										<small class="text-body-secondary">Likes:${tweets[i].tweetLikes}</small>
									</p>
								</div>
								<button type="button" class="btn btn-danger">Delete</button>
							</div>
							
						</div>
					</div>
` 
	}
	
	document.getElementById('mytweet').innerHTML = listString;
	
}


function likeTweet(){
	
	fetch(`http://localhost:8080/postbook/webapi/twitter/tweets/likes/${tweetid}`,{
		method:'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then((resp)=>resp.json())
	.them((data)=>console.log(data))
}


