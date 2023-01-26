// Constants

const btnType = {
  postNewComment: "comment-box-post-btn",
  postNewReply: "comment-box-reply-btn",
  replyToComment: "reply-to-comment-btn",
  deleteComment: "delete-comment",
  editComment: "edit-comment",
  cancelChanges: "cancel-changes",
  saveChanges: "save-changes",
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
  // Delete comment
  if (
    e.target.nodeName === "BUTTON" &&
    e.target.name === btnType.deleteComment
  ) {
    deleteCommentHandler(e);
  }
  // Edit comment
  if (e.target.nodeName === "BUTTON" && e.target.name === btnType.editComment) {
    editCommentHandler(e);
  }
  // Cancel editing comment
  if (
    e.target.nodeName === "BUTTON" &&
    e.target.name === btnType.cancelChanges
  ) {
    cancelEditHandler(e);
  }
  // save updated comment
  if (e.target.nodeName === "BUTTON" && e.target.name === btnType.saveChanges) {
    saveUpdatedCommentHandler(e);
  }
}

function replyClickHandler(e) {
  const commentWrapper = e.target.closest(".comment__wrapper");

  let replyContainer;

  if (commentWrapper.dataset.type === "comment") {
    replyContainer = commentWrapper.querySelector(".replies");
  } else {
    replyContainer = commentWrapper.closest(".replies");
  }
  if (replyContainer.querySelector(".comment__box")) {
    return;
  }
  replyContainer.appendChild(getCommentBoxNode());
}

function deleteCommentHandler(e) {
  e.target.closest("article.comment__wrapper").remove();
}

function editCommentHandler(e) {
  const commentNode = e.target
    .closest(".comment__wrapper")
    .querySelector(".comment__container");

  commentNode.appendChild(getEditCommentCTAElement());
  e.target.parentNode.remove();
}

function cancelEditHandler(e) {}

function saveUpdatedCommentHandler(e) {}

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
  DIV.classList.add("comment__container");

  const PARAGRAPH = document.createElement("p");
  PARAGRAPH.textContent = commentValue;

  DIV.appendChild(PARAGRAPH);

  ARTICLE.append(DIV, getCommentCTAElement());

  if (isComment) {
    const DIV_REPLIES = document.createElement("div");
    DIV_REPLIES.classList.add("replies");
    ARTICLE.append(DIV_REPLIES);
  }

  return ARTICLE;
}

function getCommentCTAElement() {
  const DIV_CTA = document.createElement("div");
  DIV_CTA.classList.add("cta-container");

  const BUTTON_REPLY = document.createElement("button");
  BUTTON_REPLY.textContent = "Reply";
  BUTTON_REPLY.classList.add("btn", "btn--secondary");
  BUTTON_REPLY.name = "reply-to-comment-btn";

  const BUTTON_EDIT = document.createElement("button");
  BUTTON_EDIT.textContent = "Edit";
  BUTTON_EDIT.classList.add("btn", "btn--secondary");
  BUTTON_EDIT.name = "edit-comment";

  const BUTTON_DELETE = document.createElement("button");
  BUTTON_DELETE.textContent = "Delete";
  BUTTON_DELETE.classList.add("btn", "btn--secondary");
  BUTTON_DELETE.name = "delete-comment";

  DIV_CTA.append(
    BUTTON_REPLY,
    getVerticalDividerElement(),
    BUTTON_EDIT,
    getVerticalDividerElement(),
    BUTTON_DELETE
  );

  return DIV_CTA;
}

function getEditCommentCTAElement() {
  const DIV_CTA = document.createElement("div");
  DIV_CTA.classList.add("comment__edit-cta");

  const BUTTON_SAVE = document.createElement("button");
  BUTTON_SAVE.textContent = "Save Changes";
  BUTTON_SAVE.classList.add("btn", "btn--primary");
  BUTTON_SAVE.name = "save-changes";

  const BUTTON_CANCEL = document.createElement("button");
  BUTTON_CANCEL.textContent = "Cancel";
  BUTTON_CANCEL.classList.add("btn", "btn--tertiary");
  BUTTON_CANCEL.name = "cancel-changes";

  DIV_CTA.append(BUTTON_SAVE, BUTTON_CANCEL);

  return DIV_CTA;
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

function getVerticalDividerElement() {
  const DIV = document.createElement("div");
  DIV.classList.add("vertical-divider");
  return DIV;
}
