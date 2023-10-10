import React from "react";
import styles from "./ShareModel.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ShareModel(props) {
  let { username, setIsShown, userId } = props;
  return (
    <>
      <div className={styles.meDim}></div>
      <div
        className="modal show"
        style={{ display: "block", position: "absolute", top: "0" }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Share {username}'s profile</Modal.Title>
            <button
              className={`${styles.meBtn}`}
              onClick={() => {
                setIsShown(false);
              }}
            >
              <i className="fa-solid fa-x" style={{ color: " #000" }}></i>
            </button>
          </Modal.Header>

          <Modal.Body>
            <p>http://localhost:3000/message/{userId}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setIsShown(false);
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://localhost:3000/message/${userId}`
                );
              }}
            >
              Copy
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
}

export default ShareModel;
