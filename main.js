/** A div that will contain all of our posts*/
var $postContainer = $("#post-content");
/** An array of posts objects */
var postData = [];

/** 
 * Renders a post object to the user
 * @param { Object } userPost - An object that contains a name, post, and comment properties.
 */
function renderPost(userPost) {
  // renders a post
  $postContainer.append(`
    <div class="alert alert-primary">
      <p onClick="removePost()" class="btn btn-link remove-btn">Remove post</p>
      <p onclick="toggleCommentForm()" class="post-comment-btn btn btn-link">comments<p>
      <p class="post-content">${userPost.post}</p>
      <div class="post-author-container">
        posted by: <p class="post-author">${userPost.name}</p>
      </div>
      <hr>  
      
      <div class="comment-container"></div>
      
      <form class="comment-form">
          <div class="form-group comment-form-name">
            <input type="text" class="form-control" id="comment-name" placeholder="Your name">
          </div>

          <div class="form-group">
            <textarea class="form-control" placeholder="Enter Comment" id="comment-body" rows="3"></textarea>
          </div>
          <button type="button" onClick="submitComment()" id="comment-submit-btn" class="btn btn-primary">Post Comment</button>
  
        </form>
    </div> 
  `);

}

/** Handle submitting form */
function submitPost() {
  // a post user object
  var postObj = {};
  var postBody = $('#post-body').val();
  var name = $('#post-name').val();

  // validate user input
  if (name === "" || postBody === "") {
    alert('Please enter a name and post content');
    return;
  }
  // assign properties and values to our user object
  postObj.name = name;
  postObj.post = postBody;

  postData.push(postObj);
  // render post to user
  renderPost(postObj);

  // reset form values after submitting successfully 
  $('#post-body').val("");
  $('#post-body').attr("placeholder", "Your name");
  $('#post-name').val("");
  $('#post-name').attr("placeholder", "Enter text");
};


/** Function that handles submitting a comment */
function submitComment() {
  // an array that will contain all of comments as objects
  var commentArray = [];
  // comment object with author and content properties
  var commentObj = {};

  var commentAuthor = $(event.target).closest('.alert').find('#comment-name').val();
  var commentContent = $(event.target).closest('.alert').find('#comment-body').val();

  // validate user input
  if (commentContent === "" || commentAuthor === "") {
    alert('Please enter a name and comment content');
    return;
  }
  // create comment properties and assign values
  commentObj.author = commentAuthor;
  commentObj.content = commentContent;

  // get the author the comment will be submitted to 
  var postAuthorClicked = $(event.target).closest('.alert').find('.post-author').text();

  // get the user object
  var postUserObj = findUserObj(postAuthorClicked);
  // create a property 'comments' if it does not exist on the user object
  if (!postUserObj['comments']) {
    commentArray.push(commentObj);
    postUserObj.comments = commentArray;
    $(event.target).closest('.alert').find('#comment-name').val("");
    $(event.target).closest('.alert').find('#comment-name').attr("placeholder", "Your name");
    $(event.target).closest('.alert').find('#comment-body').val("");
    $(event.target).closest('.alert').find('#comment-body').attr("Enter Comment");
  } else {
    // push the comment in the comments array 
    postUserObj['comments'].push(commentObj);
  };

  renderComment(commentObj);
  // reset form values 
  $(event.target).closest('.alert').find('#comment-name').val("");
  $(event.target).closest('.alert').find('#comment-name').attr("placeholder", "Your name");
  $(event.target).closest('.alert').find('#comment-body').val("");
  $(event.target).closest('.alert').find('#comment-body').attr("Enter Comment");

};

/** 
 * Function that renders comments to each post 
 * @param { Object } comment - An object that contains the comment author and content
 */
function renderComment(comment) {
  var $commentContainer = $(event.target).closest('.alert').find('.comment-container');

  $commentContainer.append(`
    <p class="comment">
      ${comment.content} - posted by: <strong>${comment.author}<strong>
      <i onClick="removeComment()" class="fas fa-times"></i>
    </p>
  `);
}

/** Deletes a comment the user clicked on */
function removeComment() {
  $(event.target).closest('.comment').remove();
}

/** Deletes a post when the user clicks the 'Remove post' link */
function removePost() {
  $(event.target).closest('.alert').remove();
}

/** Handles the comments toggle */
function toggleCommentForm() {
  $(event.target).closest('.alert').find('.comment-container').toggleClass('show');
  $(event.target).closest('.alert').find('.comment-form').toggleClass('show');
};

/** 
 * Function that finds the user object in the postData array 
 * @param { String } name - The name of the user
 */
function findUserObj(name) {
  var user = postData.find(function (userFound) {
    return userFound.name === name;
  });
  return user;
};
