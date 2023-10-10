import React from "react";
import styles from "./SendMessage.module.css";
import { useParams } from "react-router-dom";

function SendMessage() {
  let id = useParams();
  console.log(id);
  return <div></div>;
}

export default SendMessage;
