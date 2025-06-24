import React, { useState, useEffect, useRef } from "react";
import styles from "./Post.module.css";
import Heart from "react-animated-heart";
import { useCopyToClipboard } from "usehooks-ts";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default function PostButtons() {
  const [click, setClick] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isCommentsPost, setIsCommentsPost] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [share, setShare] = useState(false);
  const [urlLink, setUrlLink] = useState("");
  const [value, copy] = useCopyToClipboard();
  const containerReference = useRef();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  const handleLikeToggle = () => {
    if (isLoggedIn) {
      setClick(!click);
      setLikeCount(likeCount + (click ? -1 : 1));
    } else {
      alert("Please log in to like the post.");
    }
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      setIsCommentsPost(true);
    } else {
      alert("Please log in to comment.");
    }
  };

  const handleCommentClose = () => {
    setIsCommentsPost(false);
  };

  const handleComments = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleShare = () => {
    setShare((prevShare) => !prevShare);
    setUrlLink(window.location.href);
  };

  return (
    <div className={styles.reactions}>
      <div className={styles.likeContainer}>
        <Heart onClick={handleLikeToggle} filled={click} />
        <span className={styles.likeCount}>{likeCount}</span>
      </div>

      <i onClick={handleCommentClick} className="fa-regular fa-comments"></i>
      <i onClick={handleShare} className="fa-regular fa-share-from-square"></i>
      <i className="fa-regular fa-bookmark"></i>

      {isCommentsPost && (
        <div className={styles.commentPopup}>
          <div className={styles.commentPopupHeader}>
            <h3 className={styles.commentPopupTitle}>Comments</h3>
            <button className={styles.commentPopupCloseBtn} onClick={handleCommentClose}>×</button>
          </div>
          <div className={styles.commentList}>
            {comments.length === 0 && (
              <div style={{ color: '#aaa', textAlign: 'center', marginBottom: '1rem' }}>No comments yet.</div>
            )}
            {comments.map((value, index) => (
              <div className={styles.commentItem} key={index}>
                <img
                  className={styles.commentProfileImg}
                  src="https://media.istockphoto.com/id/1322220448/photo/abstract-digital-futuristic-eye.jpg?s=612x612&w=0&k=20&c=oAMmGJxyTTNW0XcttULhkp5IxfW9ZTaoVdVwI2KwK5s="
                  alt="profile"
                  height="40"
                  width="40"
                />
                <div className={styles.commentContent}>
                  <div className={styles.commentUser}>{localStorage.getItem('loggedInUser') || 'User'}</div>
                  <div className={styles.commentText}>{value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.commentInputRow}>
            <input
              placeholder="Add a comment"
              className={styles.commentInput}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className={styles.commentPostBtn} onClick={handleComments}>
              Post
            </button>
          </div>
        </div>
      )}

      {share && (
        <div onClick={handleShare} className={styles.share_overlay}>
          <div
            className={styles.share_container}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.close_share_btn}>
              <i onClick={handleShare} className="fa-solid fa-xmark"></i>
            </div>

            <h2 className={styles.share_heading}>Share</h2>
            <hr className={styles.line} />

            <div className={styles.socials} ref={containerReference}>
              <EmailShareButton url={urlLink}>
                <EmailIcon size={65} round />
                Email
              </EmailShareButton>
              <WhatsappShareButton url={urlLink}>
                <WhatsappIcon size={65} round />
                Whatsapp
              </WhatsappShareButton>
              <FacebookShareButton url={urlLink}>
                <FacebookIcon size={65} round />
                Facebook
              </FacebookShareButton>
              <LinkedinShareButton url={urlLink}>
                <LinkedinIcon size={65} round />
                LinkedIn
              </LinkedinShareButton>
            </div>

            <hr className={styles.line} />

            <div className={styles.copy_link}>
              <input
                type="text"
                className={styles.link}
                value={urlLink}
                disabled
              />
              <button className={styles.copy_btn} onClick={() => copy(urlLink)}>
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
