import { Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../firebaseConfig";
import firebase from "firebase/compat/app";
import { useContextApi } from "../firebaseServices/firebaseServices";

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }
  > form > button {
    display: none;
  }
`;

const ChatInput = ({
  channelName,
  channelId,
  sendMessage,
  textInput,
  setTextInput,
}) => {
  // const [textInput, setTextInput] = useState("");

  const { user } = useContextApi();

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   if (!channelId) {
  //     return false;
  //   }
  //   db.collection("rooms").doc(channelId).collection("messages").add({
  //     message: textInput,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     user: user?.displayName,
  //     userImage: user?.photoURL,
  //   });
  //   setTextInput("");
  // };
  return (
    <div>
      <ChatInputContainer>
        <form>
          <input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            type="text"
            placeholder={`Enter #${channelName}`}
          />
          <Button type="submit" onClick={(e) => sendMessage(e)}>
            {/* {() => sendMessage()} */}
            Send
          </Button>
        </form>
      </ChatInputContainer>
    </div>
  );
};

export default ChatInput;
