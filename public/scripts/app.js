$(function () {

  // Fake data taken from tweets.json
  // var data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //       },
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //       },
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   },
  //   {
  //     "user": {
  //       "name": "Johann von Goethe",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //       },
  //       "handle": "@johann49"
  //     },
  //     "content": {
  //       "text": "<script>alert('uh oh!');</script> Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //     },
  //     "created_at": 1461113796368
  //   }
  // ];

  //take in an array of tweet objects and then appending each one to the #tweets-container
  function renderTweets(tweets) {
    // loops through tweets
    tweets.forEach(function (tweet) {
    // calls createTweetElement for each tweet
      var tweetHtml = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#all-tweets').append(tweetHtml);
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


  // prevent the existing form submission to keep the browser from leaving the page
  $('#new-tweet-form').on('submit', function (event) {
    event.preventDefault();
    var form = this;
    var input = $(this).serialize();
    // instead, submit the form data using Ajax
    $.ajax({
      method: 'post',
      url: '/tweets',
      data: input
    }).done(function () {
      // empty the text from the form field upon post
      form.reset();
      loadTweets();
    })
  })
})

