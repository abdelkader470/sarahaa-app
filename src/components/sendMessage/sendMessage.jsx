import React from "react";
import styles from "./SendMessage.module.css";
import { useParams } from "react-router-dom";
import avatar from "../../images/avatar.png";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../Redux/sendMessageSlice";

function SendMessage() {
  const id = useParams();
  const dispatch = useDispatch();

  const sendingStatus = useSelector((state) => state.messages.sendingStatus);
  const sentMessage = useSelector((state) => state.messages.sentMessage);

  const addMessages = (values) => {
    dispatch(
      sendMessage({
        messageContent: values.messageContent,
        receivedId: id.id,
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      messageContent: "",
    },
    onSubmit: (values) => {
      addMessages(values);
    },
  });

  return (
    <div className="container text-center pt-5 mt-5 text-center">
      <div className="card py-5 mb-5">
        <a href data-toggle="modal" data-target="#profile">
          <img src={avatar} className="avatar " alt="" />
        </a>

        <div className="container w-50 m-auto mt-3">
          <form onSubmit={formik.handleSubmit}>
            <textarea
              className="form-control"
              name="messageContent"
              value={formik.values.messageContent}
              onChange={formik.handleChange}
              cols={10}
              rows={9}
              placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)"
              defaultValue={""}
            />
            <button type="submit" className="btn btn-outline-info mt-3">
              <i className="far fa-paper-plane" /> Send
            </button>
          </form>
        </div>
      </div>
      <button
        data-toggle="modal"
        data-target="#share"
        className="btn btn-default-outline share "
      >
        <i className="fas fa-share-alt" /> Share Profile
      </button>
    </div>
  );
}

export default SendMessage;
