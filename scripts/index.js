// Constants

const btnType = {
  postComment: "post-comment",
  postReply: "post-reply",
};

// Dom elements

const postContainerElement = document.getElementById("post-container");

const commentsContainerElement = document.getElementById("comments-container");

// Event listeners

postContainerElement.addEventListener("click", postEventsHandler);

// Functions

function postEventsHandler(e) {
  // Post reply button
  if (e.target.nodeName === "BUTTON" && e.target.name === "post-comment") {
    const comment = getCommentValue(e);
    comment && postComment(e, comment);
    return;
  }
}

// Utilities

function getCommentValue(e) {
  const inputElement = e.target.previousElementSibling;
  if (
    inputElement?.nodeName === "INPUT" &&
    inputElement?.name === "comment-input"
  ) {
    return inputElement.value;
  }
  return "";
}

function getCommentNode(commentValue) {
  const DIV = document.createElement("div");
  DIV.classList.add("comment");
  DIV.textContent = commentValue;

  return DIV;
}

function postComment(e, comment) {
  if (e.target.name === btnType.postComment) {
    const commentNode = getCommentNode(comment);
    commentsContainerElement.prepend(commentNode);
    return;
  }
}
