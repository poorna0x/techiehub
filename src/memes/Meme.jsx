import React, { useState } from "react";
import styles from "./Meme.module.css";

import { memedata } from "./MemesData";
import CloseIcon from "@mui/icons-material/Close";


import { Link } from "react-router-dom";
import Upload from "../home/post/Upload";
import EmojiPickerComponent from "../home/post/EmojiPickerComponent";
import PostButtons from "../home/post/PostButtons";
import NavBar from "../component/NavBar";
import SideNavMeme from "./SideNavMeme";

export default function Post() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [posts, setPosts] = useState(memedata);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [file, setFile] = useState("");

  const handleFollowToggle = () => {
    setIsFollowing((prevState) => !prevState);
  };

  const handlePostClick = (e) => {
    e.stopPropagation();
    setIsCreatingPost(true);
  };

  const handlePostClose = () => {
    setIsCreatingPost(false);
    setNewPostText("");
    if (isEmojiPickerVisible) setIsEmojiPickerVisible(false);
    if (isUploadVisible) setIsUploadVisible(false);
  };

  const handleEmojiClick = () => {
    if (isCreatingPost) {
      setIsEmojiPickerVisible(!isEmojiPickerVisible);
    } else {
      setIsCreatingPost(true);
      setIsEmojiPickerVisible(true);
    }
  };

  const handleUpload = () => {
    if (isCreatingPost) {
      setIsUploadVisible(!isUploadVisible);
    } else {
      setIsCreatingPost(true);
      setIsUploadVisible(true);
    }
  };

  const handleImageUpload = (type, upload) => {
    setFile(upload);
    if (type.startsWith("image")) {
      setImage(upload);
      setVideo("");
    } else {
      setVideo(upload);
      setImage("");
    }
    setIsUploadVisible(false);
  };

  const handleEmojiSelection = (emoji) => {
    setNewPostText((prevText) => prevText + emoji);
  };

  const handlePostCreation = () => {
    let mediaURLimg;
    let mediaURLvid;
    if (video === "") {
      mediaURLimg = image;
    } else if (image === "") {
      mediaURLvid = video;
    }

    if (newPostText.trim() !== "" || mediaURLimg || mediaURLvid) {
      const newPost = {
        userProfile: {
          userImage:
            "https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?ga=GA1.1.490964057.1750763884&semt=ais_hybrid&w=740",
          alt: "User Alt",
          userName: localStorage.getItem("username"),
        },
        userPost: {
          discription: newPostText,
          postImage: mediaURLimg,
          postVideo: mediaURLvid,
          alt: "post",
        },
      };
      if (isEmojiPickerVisible) setIsEmojiPickerVisible(false);
      if (isUploadVisible) setIsUploadVisible(false);
      memedata.unshift(newPost);
      setNewPostText("");
      setImage("");
      setVideo("");
      setFile("");
      setIsCreatingPost(false);
      setPosts([...posts], memedata);
    }
  };

  return (
    <>
    <NavBar/>
    <SideNavMeme/>
      {isCreatingPost && <div className={styles.blank}></div>}

      <div className={styles.post}>
        <div className={styles.newPost}>
          <img
            src="https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?ga=GA1.1.490964057.1750763884&semt=ais_hybrid&w=740"
            alt="user"
            className={styles.userDP}
          />
          <label htmlFor="userpost">
            <input
              type="text"
              id="userpost"
              placeholder="Create new post"
              className={styles.Input}
              readOnly
              onClick={handlePostClick}
            />
          </label>
        </div>

        <hr />

        {memedata.map((data, idx) => (
          <div className={styles.userpost} key={idx}>
            <div className={styles.userProfile}>
              <Link to={`/profile/${data.userProfile.userName}`}>
                <img
                  src={data.userProfile.userImage}
                  alt={data.userProfile.alt}
                  className={styles.profilePic}
                />
              </Link>
              <Link
                to={`/profile/${data.userProfile.userName}`}
                className={styles.userName}
              >
                <span>{data.userProfile.userName}</span>
              </Link>
              <button
                className={`${styles.followButton} ${
                  isFollowing ? styles.whenclick1 : ""
                }`}
                onClick={handleFollowToggle}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>

            <div className={styles.userpostdata}>
              <p className={styles.discription}>{data.userPost.discription}</p>

              {data.userPost.postImage && (
                <img
                  src={data.userPost.postImage}
                  alt={data.userPost.alt}
                  className={styles.pstimg}
                />
              )}
              {data.userPost.postVideo && (
                <video
                  src={data.userPost.postVideo}
                  alt={data.userPost.alt}
                  className={styles.pstimg}
                  controls
                />
              )}

              <PostButtons />
            </div>
          </div>
        ))}
      </div>

      {isCreatingPost && (
        <div className={styles.popup}>
          <div className={styles.popHeader}>
            <h3 className={styles.poptitle}>Create Post</h3>
            <button onClick={handlePostClose}>
              <CloseIcon />
            </button>
          </div>

          <div>
            <textarea
              placeholder="What do you want to talk about ?"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
            {image === "" ? (
              video === "" ? (
                ""
              ) : (
                <video
                  src={video}
                  controls
                  alt="Uploaded Video"
                  className={styles.postimgvid}
                />
              )
            ) : (
              <img src={image} alt="Uploaded Pic" className={styles.postimgvid} />
            )}
          </div>

          <hr />

          <div className={styles.emojis}>
            <i className="fa-regular fa-image" onClick={handleUpload}></i>
            <i className="fa-regular fa-face-smile" onClick={handleEmojiClick}></i>
            <i className="fa-regular fa-calendar-days"></i>
            <button className={styles.Postbtn} onClick={handlePostCreation}>
              Post
            </button>
          </div>

          <hr />
        </div>
      )}

      {isEmojiPickerVisible && (
        <EmojiPickerComponent onSelect={handleEmojiSelection} />
      )}

      {isUploadVisible && (
        <div className={styles.popup}>
          <div className={styles.popHeader}>
            <h3 className={styles.poptitle}>Upload</h3>
            <button onClick={() => setIsUploadVisible(false)}>
              <CloseIcon />
            </button>
          </div>
          <Upload handleImageUpload={handleImageUpload} />
        </div>
        
      )}
    </>
  );
}
