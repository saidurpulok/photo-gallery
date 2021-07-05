import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { db, storage } from "../../firebase";
import firebase from "firebase";
import { Button } from 'reactstrap';
import './UploadForm.css';

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const userId = useState(localStorage.getItem('userId'))[0];
  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("photos").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              userId: userId,
              category: selected
            });

            setProgress(0);
            setCaption("");
            setImage(null);
            setUploaded(true);
          });
      }
    );

    if (uploaded === true){
      history.push("/");
    }
  };
  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <input type="file" onChange={handleChange} />
      <input
        type="text"
        height="50px"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <label>
          Category:
          <select value={selected} onChange={(event) => setSelected(event.target.value)}>
            <option value="Nature">Nature</option>
            <option value="Technology">Technology</option>
            <option value="Grocery">Grocery</option>
            <option value="Cars">Cars</option>
            <option value="Others">Others</option>
          </select>
        </label>
      <Button disabled={!image} onClick={handleUpload}>Upload</Button>

      {uploaded && <Redirect to="/" />
      }
    </div>
  );
}

export default ImageUpload;
