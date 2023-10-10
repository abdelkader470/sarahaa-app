import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import avatar from "../../images/avatar.png";
import axios from "axios";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useQuery } from "react-query";

function Profile() {
  const [userId, setUserId] = useState("");
  const {
    data: messages,
    isError,
    isLoading,
  } = useQuery("messages", fetchMessages);

  async function fetchMessages() {
    const response = await axios.get(
      "https://sara7aiti.onrender.com/api/v1/message",
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    return response.data.allMessages;
  }

  useEffect(() => {
    const decoded = jwtDecode(localStorage.getItem("userToken"));
    setUserId(decoded.id);
  }, []);

  return (
    <>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card pt-5">
          <a href="#" data-toggle="modal" data-target="#profile">
            <img src={avatar} className="avatar" alt="" />
          </a>
          <h3 className="py-2">Abdelkader Elsisy</h3>
          {userId && (
            <Link
              data-toggle="modal"
              data-target="#share"
              className="btn btn-default-outline share"
              to={`/message/${userId}`}
            >
              <i className="fas fa-share-alt" /> Share Profile
            </Link>
          )}
        </div>
      </div>

      <div className="container text-center my-5 text-center">
        <div className="row">
          {isLoading ? (
            <div className="col-md-12">
              <div className="card py-5">
                <p>Loading...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="col-md-12">
              <div className="card py-5">
                <p>Error fetching messages</p>
              </div>
            </div>
          ) : messages && messages.length === 0 ? (
            <div className="col-md-12">
              <div className="card py-5">
                <p>You don't have any messages... </p>
              </div>
            </div>
          ) : (
            messages.map((ele) => (
              <div key={ele._id} className="col-md-12">
                <div className="card py-5">
                  <p>{ele.messageContent}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
