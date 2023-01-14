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
  // Comment button
  if (e.target.nodeName === "BUTTON" && e.target.name === btnType.postComment) {
    const comment = getCommentValue(e);
    comment && postComment(comment);
    return;
  }
  // Reply button
  if (e.target.nodeName === "BUTTON" && e.target.name === btnType.postReply) {
    replyClickHandler(e);
  }
}

function replyClickHandler(e) {
  const commentWrapper = e.target.closest(".comment__wrapper");
  const isNestedComment = commentWrapper.dataset.reply === "true";
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
  INPUT.setAttribute("placeholder", "Add a comment ...");
  INPUT.classList.add("comment__input");

  const BUTTON = document.createElement("button");
  BUTTON.setAttribute("name", "post-comment");
  BUTTON.classList.add("btn", "btn--primary");
  BUTTON.textContent = "Reply";

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

function getCommentNode(commentValue, isNestedComment) {
  const ARTICLE = document.createElement("article");
  ARTICLE.classList.add("comment__wrapper");
  ARTICLE.setAttribute("data-reply", isNestedComment);

  const DIV = document.createElement("div");
  DIV.classList.add("comment");
  DIV.textContent = commentValue;

  const BUTTON = document.createElement("button");
  BUTTON.textContent = "Reply";
  BUTTON.classList.add("btn", "btn--secondary");
  BUTTON.name = "post-reply";

  ARTICLE.append(DIV, BUTTON);

  return ARTICLE;
}

function postComment(comment, isNestedComment = false) {
  const commentNode = getCommentNode(comment, isNestedComment);
  commentsContainerElement.prepend(commentNode);
  return;
}
