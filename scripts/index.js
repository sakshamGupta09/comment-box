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
  // Post Rply button
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
  const isNestedComment = commentWrapper.querySelector(".replies");

  if (isNestedComment) {
    commentWrapper.querySelector(".replies").appendChild(getCommentBoxNode());
    return;
  }
  const node = getNestedRepliesNode();
  node.appendChild(getCommentBoxNode());
  commentWrapper.appendChild(node);
}

// Utilities

function getNestedRepliesNode() {
  const DIV = document.createElement("div");
  DIV.classList.add("replies");
  return DIV;
}

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

function getCommentNode(commentValue) {
  const ARTICLE = document.createElement("article");
  ARTICLE.classList.add("comment__wrapper");

  const DIV = document.createElement("div");
  DIV.classList.add("comment");
  DIV.textContent = commentValue;

  const BUTTON = document.createElement("button");
  BUTTON.textContent = "Reply";
  BUTTON.classList.add("btn", "btn--secondary");
  BUTTON.name = "reply-to-comment-btn";

  ARTICLE.append(DIV, BUTTON);

  return ARTICLE;
}

function postComment(comment) {
  const commentNode = getCommentNode(comment);
  commentsContainerElement.prepend(commentNode);
}

function postReplyToComment(e, comment) {
  const commentNode = getCommentNode(comment);
  const parent = e.target.closest(".replies");
  parent.appendChild(commentNode);
  e.target.parentElement.remove();
}
