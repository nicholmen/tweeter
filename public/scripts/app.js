$(function () {
  
  // compose tweet functionality
  $( ".composeTweetButton" ).click(function() {
    $( ".new-tweet" ).slideToggle( "slow", function() {
      $("#tweetInput").focus();
    });
  })

  //take in an array of tweet objects and then appending each one to the #tweets-container
  function renderTweets(tweets) {
    // loops through tweets
    tweets.forEach(function (tweet) {
    // calls createTweetElement for each tweet
      var tweetHtml = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#all-tweets').prepend(tweetHtml);
    });
    }

  // use a function to escape some text (preventing from xss)
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //a function that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.
  function createTweetElement (tweetData) {
    return `
    <article class="tweet-container">
      <header>
        <span class="header-left">
          <span class="user-photo"> <img src=${tweetData.user.avatars.small}> </span>
          <span class="tweet-author">${tweetData.user.name}</span>
        </span>
        <span class="author-handle">${tweetData.user.handle}</span>
      </header>
      <div class="tweet-body">
        <p>${escape(tweetData.content.text)}</p>
      </div>
      <footer class="tweet-footer">
        <span>
          ${tweetData.created_at}
        </span>
        <span class="tweet-icons">
          <i class=" tweet-icon fa fa-flag" aria-hidden="true"></i>
          <i class="tweet-icon fa fa-retweet" aria-hidden="true"></i>
          <i class="tweet-icon fa fa-heart" aria-hidden="true"></i>
        </span>
      </footer>
    </article>
    `
  }

  var allTweets = $('#all-tweets');
  
  // fetch tweets from the http://localhost:8080/tweets page
  function loadTweets () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweets) {
        allTweets.empty();
        renderTweets(tweets)
      } 
    })
  }
  loadTweets();


  // prevent the existing form submission to keep the browser from leaving the page, use ajax to make the request
  const $tweetInput = $("#tweetInput");
  const $tweetAlert = $('#tweetAlert');

  $('#new-tweet-form').on('submit', function (event) {
    event.preventDefault();
    var form = this;
    var input = $(this).serialize();

    if (!$tweetInput.val()) {
      return alert("add something");
    }
    else if (($tweetInput.val()).length > 140) {
      return alert("less characters please");
    }
    // instead, submit the form data using Ajax
    $.ajax({
      method: 'post',
      url: '/tweets',
      data: input
    }).done(function () {
      // empty the text from the form field upon post
      form.reset();
      loadTweets();
      $('.counter').html('140');
    })
  })
})
