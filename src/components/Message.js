import React from "react";
import styled from "styled-components";
import { useContextApi } from "../firebaseServices/firebaseServices";

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;
const MessageInfo = styled.div`
  padding-left: 10px;
  > h4 {
    font-size: 15px;
  }
  > p {
    font-size: 14px;
  }
  > h4 > span {
    color: grey;
    font-weight: 300;
    margin-left: 4px;
    font-size: 12px !important;
  }
`;

const Message = ({ userImage, message, userName, timestamp }) => {
  const { user } = useContextApi();

  return (
    <>
      <MessageContainer>
        {userImage ? (
          <img src={userImage} alt="userImage" height={40} width={40} />
        ) : (
          <img
            src="https://imgur.com/zGMoeUI.png"
            alt="https://imgur.com/zGMoeUI.png"
            height={40}
            width={40}
          />
        )}
        <MessageInfo>
          <h4>
            {userName ? userName : user?.phoneNumber? user?.phoneNumber?.split('+91')[1] : user?.email?.split("@")[0]}
            <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
          </h4>
          <p>{message}</p>
        </MessageInfo>
      </MessageContainer>
    </>
  );
};

export default Message;
