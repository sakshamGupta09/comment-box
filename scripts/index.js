// Constants

const btnType = {
  postNewComment: "comment-box-post-btn",
  postNewReply: "comment-box-reply-btn",
  replyToComment: "reply-to-comment-btn",
};

// Dom elements

const postContainerElement = document.getElementById("post-container");

const commentsContainerElement = document.getElementById("comments-container");

// Event listeners

postContainerElement.addEventListener("click", postEventsHandler);

// Functions

function postEventsHandler(e) {
  // Post Comment button
  if (
    e.target.nodeName === "BUTTON" &&
    e.target.name === btnType.postNewComment
  ) {
    const comment = getCommentValue(e);
    comment && postComment(comment);
    return;
  }
  // Post Reply button
  if (
    e.target.nodeName === "BUTTON" &&
    e.target.name === btnType.postNewReply
  ) {
    const comment = getCommentValue(e);
    comment && postReplyToComment(e, comment);
    return;
  }
  // Reply button
  if (
    e.target.nodeName === "BUTTON" &&
    e.target.name === btnType.replyToComment
  ) {
    replyClickHandler(e);
  }
}

function replyClickHandler(e) {
  const commentWrapper = e.target.closest(".comment__wrapper");
  if (commentWrapper.querySelector(".comment__box")) {
    return;
  }
  let replyContainer;

  if (commentWrapper.dataset.type === "comment") {
    replyContainer = commentWrapper.querySelector(".replies");
  } else {
    replyContainer = commentWrapper.closest(".replies");
  }

  replyContainer.appendChild(getCommentBoxNode());
}

// Utilities

function getCommentBoxNode() {
  const DIV = document.createElement("div");
  DIV.classList.add("comment__box", "mt-xs");

  const INPUT = document.createElement("input");
  INPUT.setAttribute("type", "text");
  INPUT.setAttribute("name", "comment-input");
  INPUT.setAttribute("placeholder", "Add a reply ...");
  INPUT.classList.add("comment__input");

  const BUTTON = document.createElement("button");
  BUTTON.setAttribute("name", "comment-box-reply-btn");
  BUTTON.classList.add("btn", "btn--primary");
  BUTTON.textContent = "Post";

  DIV.append(INPUT, BUTTON);
  return DIV;
}

function getCommentValue(e) {
  const inputElement = e.target.previousElementSibling;
  let value = "";
  if (
    inputElement?.nodeName === "INPUT" &&
    inputElement?.name === "comment-input"
  ) {
    value = inputElement.value;
    inputElement.value = "";
  }
  return value;
}

function getCommentNode(commentValue, isComment = true) {
  const ARTICLE = document.createElement("article");
  ARTICLE.classList.add("comment__wrapper");
  ARTICLE.dataset.type = isComment ? "comment" : "reply";

  const DIV = document.createElement("div");
  DIV.classList.add("comment");
  DIV.textContent = commentValue;

  const BUTTON = document.createElement("button");
  BUTTON.textContent = "Reply";
  BUTTON.classList.add("btn", "btn--secondary");
  BUTTON.name = "reply-to-comment-btn";

  ARTICLE.append(DIV, BUTTON);

  if (isComment) {
    const DIV_REPLIES = document.createElement("div");
    DIV_REPLIES.classList.add("replies");
    ARTICLE.append(DIV_REPLIES);
  }

  return ARTICLE;
}

function postComment(comment) {
  const commentNode = getCommentNode(comment);
  commentsContainerElement.prepend(commentNode);
}

function postReplyToComment(e, comment) {
  const commentNode = getCommentNode(comment, false);
  const repliesContainer = e.target.closest(".replies");
  repliesContainer.appendChild(commentNode);
  e.target.parentNode.remove();
}
