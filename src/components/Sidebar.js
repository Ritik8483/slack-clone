import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarOptions from "./SidebarOptions";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebaseConfig";
import { MdOutlineCreate } from "react-icons/md";
import { useContextApi } from "../firebaseServices/firebaseServices";

const SidebarContainer = styled.div`
  height: calc(100vh - 70px);
  color: white;
  background-color: var(--slack-color);
  border-top: 1px solid #49274b;
  min-width: 270px;
  > hr {
    border: 1px solid #49274b;
    margin: 10px 0;
  }
`;
const SidebarHeader = styled.div`
  border-bottom: 1px solid #49274b;
  display: flex;
  justify-content: space-between;
  padding: 13px;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;
const SidebarInfo = styled.div`
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;

const Sidebar = () => {
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  const { user } = useContextApi();
  return (
    <div>
      <SidebarContainer>
        <SidebarHeader>
          <SidebarInfo>
            <h2>
              Hi{" "}
              {user?.displayName
                ? user?.displayName
                : user?.phoneNumber
                ? user?.phoneNumber?.split("+91")[1]
                : user?.email?.split("@")[0]}
            </h2>
            <h3>
              <FiberManualRecordIcon
                style={{ fontSize: "13px", marginTop: "2px" }}
              />
              {user?.displayName
                ? user?.displayName
                : user?.phoneNumber
                ? user?.phoneNumber?.split("+91")[1]
                : user?.email?.split("@")[0]}
            </h3>
          </SidebarInfo>
          <MdOutlineCreate style={{ cursor: "pointer", fontSize: "20px" }} />
        </SidebarHeader>
        <SidebarOptions Icon={InsertCommentIcon} title="Threads" />
        <SidebarOptions Icon={InboxIcon} title="Mentions & Reactions" />
        <SidebarOptions Icon={DraftsIcon} title="Saved items" />
        <SidebarOptions Icon={BookmarkBorderIcon} title="Channel Browser" />
        <SidebarOptions Icon={PeopleAltIcon} title="People & user groups" />
        <SidebarOptions Icon={AppsIcon} title="Apps" />
        <SidebarOptions Icon={FileCopyIcon} title="File browser" />
        <SidebarOptions Icon={ExpandLessIcon} title="Show Less" />
        <hr />
        <SidebarOptions Icon={ExpandMoreIcon} title="Channels" />
        <hr />
          <SidebarOptions Icon={AddIcon} addChannelOption title="Add Channel" />
        <div className="channelclass" style={{height:'175px',overflowY:'scroll'}}>
          {channels?.docs?.map((doc, index) => (
            <SidebarOptions key={doc.id} id={doc.id} title={doc.data().name} />
          ))}
        </div>
      </SidebarContainer>
    </div>
  );
};

export default Sidebar;
