import React from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AppBody from "./AppBody";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logoutMobileId } from "../redux/slackRedux";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useContextApi } from "../firebaseServices/firebaseServices";

const HeaderContainer = styled.div`
  display: flex;
  /* position: fixed; */
  width: 100%;
  /* width: fit-content; */
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: #fff;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  > .MuiSvgIcon-root:nth-child(1) {
    font-size: 40px;
    cursor: pointer;
    /* :hover{
        border: 10px solid blue;
    } */
  }
  > .MuiSvgIcon-root:nth-child(2) {
    margin-left: 100px;
  }
`;
const HeaderSearch = styled.div`
  display: flex;
  padding: 0 0 0 20px;
  align-items: center;
  border-radius: 6px;
  opacity: 1;
  color: gray;
  border: 1px solid gray;
  text-align: center;
  > .MuiSvgIcon-root {
    margin-right: 10px;
  }
  > input {
    background-color: transparent;
    color: #fff;
    height: 40px;
    font-size: 14px;
    text-align: center;
    border: 0px;
    min-width: 30vw;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: flex-end;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;
const HeaderUser = styled.div`
  color: blue;
`;
const HeaderAccountCircleIcon = styled(AccountCircleIcon)`
  border: 1px solid blue;
`;

const SidbarChatComponent = styled.div`
height: 100%;
/* overflow-y: auto; */
  display: flex;
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useContextApi();
  const handleMobileLogout = () => {
    dispatch(logoutMobileId());
    navigate("/");
  };
  return (
    <>
      <HeaderContainer>
        <HeaderLeft>
          <Dropdown>
            <Dropdown.Toggle
              className="dropDownClass"
              variant="success"
              id="dropdown-basic"
            >
              {user?.photoURL ? (
                <img height='26' width='26' src={user?.photoURL} alt={user?.photoURL} />
              ) : (
                <AccountCircleIcon />
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleMobileLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <AccessTimeIcon />
        </HeaderLeft>
        <HeaderSearch>
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </HeaderSearch>
        <HeaderRight>
          <HelpOutlineIcon />
        </HeaderRight>
      </HeaderContainer>
      <SidbarChatComponent>
        <Sidebar />
        <Chat />
      </SidbarChatComponent>
      <AppBody />
    </>
  );
};

export default Header;
