// Importing React and useState hook
import React, { useState } from 'react';

// Importing CSS module for styling
import styles from './SideBar.module.css';

// Importing the Communities component to display existing communities
import Communities from '../home/community/Communities';

// Importing UI components from Material UI
import { Modal, Button, Input } from '@mui/material';

// Sidebar component definition
export default function SideBar() {
  // State to control modal visibility
  const [openModal, setOpenModal] = useState(false);

  // State to hold the name of the new community to be added
  const [newCommunityName, setNewCommunityName] = useState('');

  // Function to open the modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to save the new community (currently only logs it)
  const handleSaveCommunity = () => {
    // TODO: Replace with actual save logic (e.g. API call or localStorage)
    console.log('Saving community:', newCommunityName);

    // Clear the input field and close the modal
    setNewCommunityName('');
    setOpenModal(false);
  };

  // Component JSX
  return (
    <div className={styles.community}>
      {/* Top box containing the Community title and plus button */}
      <div className={styles.box}>
        <h1 className={styles.commhead}>Community</h1>

        {/* Plus icon button to trigger modal */}
        <button className={styles.iconButton} onClick={handleOpenModal}>
          <i className="fa-regular fa-plus"></i>
        </button>
      </div>

      {/* Area where communities are displayed */}
      <div className={styles.chats}>
        <Communities />
      </div>

      {/* Modal for adding a new community */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className={styles.modalContent}>
          <h2>Add Community</h2>

          {/* Input field for community name */}
          <label htmlFor="communityNameInput">
            <input
              type="text"
              id="communityNameInput"
              placeholder="Community Name"
              value={newCommunityName}
              onChange={(e) => setNewCommunityName(e.target.value)}
            />
          </label>

          <br /><br />

          {/* Modal buttons: Cancel and Save */}
          <div className={styles.saveNDcancel}>
            <Button variant="contained" onClick={handleCloseModal}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveCommunity}
              style={{ marginRight: '10px' }}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
