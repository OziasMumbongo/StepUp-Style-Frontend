import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EditProfile.module.css';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    const storedPic = localStorage.getItem('profilePic');
    if (storedName) setName(storedName);
    if (storedPic) setProfilePic(storedPic);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (name.trim() === '') {
      alert("Name can't be empty.");
      return;
    }

    localStorage.setItem('username', name);
    if (profilePic) {
      localStorage.setItem('profilePic', profilePic);
    }

    alert('Profile updated successfully!');
    navigate('/homepage');
  };

  return (
    <div className={styles.wrapper}>
      <video
        autoPlay
        muted
        loop
        className={styles.backgroundVideo}
      >
        <source src="/Introducing the LeBron 17  Nike - Nike (1080p, h264).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={styles.container}>
        <h2>Edit Your Profile</h2>

        <div className={styles.profileSection}>
          {profilePic ? (
            <img src={profilePic} alt="Profile" className={styles.profilePic} />
          ) : (
            <div className={styles.placeholder}>No image</div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button onClick={handleSave} className={styles.saveBtn}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
