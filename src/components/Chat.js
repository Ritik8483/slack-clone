import React, { useRef } from "react";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebaseConfig";
import Message from "./Message";
import { useContextApi } from "../firebaseServices/firebaseServices";
import firebase from "firebase/compat/app";
import { useState } from "react";
import { useEffect } from "react";

const ChatContainer = styled.div`
  width: 100%;
 
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
`;

const ChatMessages = styled.div`
 height: calc(100vh - 280px);
  overflow-y: auto;
`;

const Chat = () => {
  const chatContainerRef=useRef();
  const [textInput, setTextInput] = useState("");
  const [textValue, setTextValue] = useState("");
  const [textMsg, setTextMsg] = useState("");



  const {user}=useContextApi();

  const slackRoomId = useSelector((state) => state.slackReducer.roomId);
  const [roomDetails] = useDocument(
    slackRoomId && db.collection("rooms").doc(slackRoomId)
  );
  const [roomMessages] = useCollection(
    slackRoomId &&
      db
        .collection("rooms")
        .doc(slackRoomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );
  const sendMessage = (e) => {
    e.preventDefault();
    if (!slackRoomId) {
      return false;
    }
    db.collection("rooms").doc(slackRoomId).collection("messages").add({
      message: textInput,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });
    setTextInput("");
    let messages = [textInput, textValue];
    setTextMsg((prev)=>[prev,messages])
  };
  
  

  const scrollToMyRef = () => {
    const scroll =
    chatContainerRef.current.scrollHeight -
    chatContainerRef.current.clientHeight;
    chatContainerRef.current.scrollTo(0, scroll);
  };

  useEffect(()=>{
    scrollToMyRef()
  },[roomMessages?.docs.length])

  return (
    <>
      <ChatContainer>
        <Header>
          <HeaderLeft>
            <h4>
              <strong>#{roomDetails?.data().name}</strong>
            </h4>
            <StarBorderOutlinedIcon />
          </HeaderLeft>
          <HeaderRight>
            <p>
              <InfoOutlinedIcon /> Details
            </p>
          </HeaderRight>
        </Header>
        <ChatMessages
        ref={chatContainerRef}
          className="chatMessageClass"
        >
          {roomMessages?.docs?.map((doc) => {
            const { message, timestamp, user, userImage } = doc.data();
            return (
              <Message
                key={doc?.id}
                message={message}
                timestamp={timestamp}
                userName={user}
                userImage={userImage}
              />
            );
          })}
        </ChatMessages>
        <ChatInput
          channelName={roomDetails?.data().name}
          channelId={slackRoomId}
          sendMessage={sendMessage}
          textInput={textInput}
          setTextInput={setTextInput}
        />
      </ChatContainer>
    </>
  );
};

export default Chat;
