import { BUTTON_TYPES } from "../constants/button-types.js";

// Dom elements

const postContainerElement = document.getElementById("post-container");

const commentsContainerElement = document.getElementById("comments");

// Event listeners

postContainerElement.addEventListener("click", postEventsHandler);

// Functions

function postEventsHandler(e) {
  // Post Comment button
  if (e.target.name === BUTTON_TYPES.postComment) {
    const comment = getCommentValue(e);
    comment && postComment(comment);
    return;
  }
  // Reply button
  if (e.target.name === BUTTON_TYPES.replyToComment) {
    replyClickHandler(e);
  }
  // Post Reply button
  if (e.target.name === BUTTON_TYPES.postReply) {
    const comment = getCommentValue(e);
    comment && postReplyToComment(e, comment);
    return;
  }
  // Delete comment
  if (e.target.name === BUTTON_TYPES.deleteComment) {
    deleteCommentHandler(e);
  }
  // Edit comment
  if (e.target.name === BUTTON_TYPES.editComment) {
    editCommentHandler(e);
  }
  // Cancel editing comment
  if (e.target.name === BUTTON_TYPES.cancelChanges) {
    cancelEditHandler(e);
  }
  // save updated comment
  if (e.target.name === BUTTON_TYPES.saveChanges) {
    saveUpdatedCommentHandler(e);
  }
}

function replyClickHandler(e) {
  const commentWrapper = e.target.closest(".comment__container");

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
  e.target.closest("article.comment__container").remove();
}

function editCommentHandler(e) {
  const commentNode = e.target
    .closest(".comment__container")
    .querySelector(".comment");

  commentNode.appendChild(getEditCommentCTAElement());
  const comment = commentNode.querySelector("p.comment__content");
  comment.setAttribute("contentEditable", true);
  placeCursorAtEnd(comment);
  e.target.parentNode.remove();
}

function cancelEditHandler(e) {
  const parent = e.target.parentNode;
  parent.parentNode.after(getCommentCTAElement());
  parent.remove();
}

function saveUpdatedCommentHandler(e) {
  const parent = e.target.parentNode;
  parent.parentNode.after(getCommentCTAElement());
  parent.remove();
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
  BUTTON.setAttribute("name", "post-reply");
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
  ARTICLE.classList.add("comment__container");
  ARTICLE.dataset.type = isComment ? "comment" : "reply";

  const DIV = document.createElement("div");
  DIV.classList.add("comment");

  const PARAGRAPH = document.createElement("p");
  PARAGRAPH.classList.add("comment__content");
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
  DIV_CTA.classList.add("comment__cta");

  const BUTTON_REPLY = getButtonElement(
    BUTTON_TYPES.replyToComment,
    "Reply",
    "btn btn--secondary"
  );

  const BUTTON_EDIT = getButtonElement(
    BUTTON_TYPES.editComment,
    "Edit",
    "btn btn--secondary"
  );

  const BUTTON_DELETE = getButtonElement(
    BUTTON_TYPES.deleteComment,
    "Delete",
    "btn btn--secondary"
  );

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

  const BUTTON_SAVE = getButtonElement(
    BUTTON_TYPES.saveChanges,
    "Save Changes",
    "btn btn--primary"
  );

  const BUTTON_CANCEL = getButtonElement(
    BUTTON_TYPES.cancelChanges,
    "Cancel",
    "btn btn--tertiary"
  );

  DIV_CTA.append(BUTTON_SAVE, BUTTON_CANCEL);

  return DIV_CTA;
}

function getButtonElement(name, text, classes) {
  const BUTTON = document.createElement("button");
  BUTTON.textContent = text;
  BUTTON.className = classes;
  BUTTON.name = name;
  return BUTTON;
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

function placeCursorAtEnd(node) {
  const selection = window.getSelection();
  const range = document.createRange();
  selection.removeAllRanges();
  range.selectNodeContents(node);
  range.collapse(false);
  selection.addRange(range);
  node.focus();
}
