import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import FaceIcon from "@mui/icons-material/Face";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { pink } from "@mui/material/colors";
import { useInterval } from "./use-interval.jsx";

function Message(props) {
  return (
    <span
      style={{
        textAlign: props.userName == props.signedInUser ? "left" : "right",
        display: "block",
      }}
    >
      <div
        style={{
          fontSize: "15px",
          textAlign: props.userName == props.signedInUser ? "left" : "right",
        }}
      >
        {props.userName}
      </div>
      <Chip
        icon={<FaceIcon style={{ color: pink[500] }} />}
        label={props.text}
        variant="outlined"
        sx={{
          backgroundColor: "lavenderblush",
          color: pink[500],
        }}
        style={{ borderColor: pink[500] }}
      />
    </span>
  );
}

function ChatRoomListItem(props) {
  return (
    <span>
      <ListItem button>
        <ListItemText
          primary={props.name}
          onClick={() => props.handleChatRoomClicked(props)}
        />
      </ListItem>
      <Divider />
    </span>
  );
}

function InputNewChat({ addChatRoom }) {
  const [newChatRoomInput, setRoomInput] = useState("");

  const handleNewChatRoom = (e) => {
    e.preventDefault();
    if (!newChatRoomInput) return;
    addChatRoom(newChatRoomInput);
    setRoomInput("");
  };

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={handleNewChatRoom}>
        <AddCircleOutlineIcon onClick={handleNewChatRoom} />
        <input
          style={{ width: "80%", backgroundColor: "lavenderblush" }}
          className="input"
          value={newChatRoomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          placeholder=" type new chat room here"
        ></input>
      </form>
    </div>
  );
}

function SendChatInput({ addMessage }) {
  const [newMessage, setInput] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage) return;
    addMessage(newMessage);
    setInput("");
  };

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={handleSendMessage}>
        <input
          className="input"
          value={newMessage}
          onChange={(e) => setInput(e.target.value)}
          placeholder=" type message here"
        ></input>
        <SendIcon onClick={handleSendMessage} />
      </form>
    </div>
  );
}

function UsernameInput({ setUsername }) {
  const [newUsername, setUsernameInput] = useState("");
  const [signedInUser, setSignedInUser] = useState("Not signed in");

  const handleNewUser = (e) => {
    e.preventDefault();
    if (!newUsername) return;
    setUsername(newUsername);
    setUsernameInput("");

    setSignedInUser(newUsername);
  };

  return (
    <div style={{ width: "90%", textAlign: "left", marginLeft: "11%" }}>
      <form onSubmit={handleNewUser}>
        <input
          style={{ width: "30%" }}
          className="input"
          value={newUsername}
          onChange={(e) => setUsernameInput(e.target.value)}
          placeholder="enter user name"
        ></input>
        <Button
          sx={{
            color: pink[500],
            textTransform: "none",
            fontFamily: "Calibri",
            fontSize: "17px",
          }}
          onClick={handleNewUser}
        >
          Sign in{" "}
        </Button>
        <div style={{ fontSize: "17px" }}>Current User: {signedInUser}</div>
      </form>
    </div>
  );
}

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [chatRoomsList, setChatRoomsList] = useState([]);
  //Set to a default chat
  const [currChat, setCurrChat] = useState({
    chatId: "952a73df-52d3-432f-afc7-b3c87ea8a09a",
    name: "asdf",
  });
  const [username, setUsername] = useState("");

  useInterval(() => {
    fetch(`https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats`)
      .then((response) => response.json())
      .then((data) => {
        setChatRoomsList(data.Items);
      });
  }, 1000);

  useInterval(
    () => {
      fetch(
        `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${currChat.chatId}/messages`
      )
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.Items);
        });
    },
    1000,
    currChat.chatId
  );

  const addMessage = (text) => {
    const message = {
      chatId: currChat.chatId,
      username: username,
      text: text,
    };
    addMessageAPI(message);
  };

  const addMessageAPI = (message) => {
    fetch(`https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).then((response) => response.json());
  };

  const addChatRoom = (name) => {
    const chat = {
      name: name,
    };
    addChatRoomAPI(chat);
  };

  const addChatRoomAPI = (chat) => {
    fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chat),
    });
  };

  const handleChatRoomClicked = (chat) => {
    fetch(
      `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${currChat.chatId}/messages`
    )
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.Items);
      });

    setCurrChat({ chat });
  };

  return (
    <div className="App">
      <UsernameInput setUsername={setUsername} />
      <table id="displayBox" style={{ overflowY: "scroll" }}>
        <tbody style={{ padding: "0px" }}>
          <tr>
            <td
              rowSpan={2}
              style={{
                verticalAlign: "top",
                textAlign: "left",
                width: "30%",
                borderRight: "5px solid #e91e63",
                backgroundColor: "lavenderblush",
                borderRadius: "30px",
              }}
            >
              <div className="scrollable">
                <div
                  style={{
                    position: "sticky",
                    top: "10px",
                    zIndex: "100",
                    backgroundColor: "lavenderblush",
                  }}
                >
                  &nbsp;Chat Rooms
                  <div
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    &nbsp;&nbsp;Current Chat Room: {currChat.name}
                  </div>
                  <InputNewChat addChatRoom={addChatRoom} />
                </div>
                <List>
                  {chatRoomsList.map((room, index) => (
                    <ChatRoomListItem
                      key={index}
                      index={index}
                      name={room.name}
                      id={room.id}
                      handleChatRoomClicked={handleChatRoomClicked}
                    />
                  ))}
                </List>
              </div>
            </td>
            <td style={{ verticalAlign: "top", width: "100%" }}>
              <div className="scrollable">
                {messages
                  .slice(0)
                  .reverse()
                  .map((message, index) => (
                    <Message
                      key={index}
                      index={index}
                      userName={message.username}
                      text={message.text}
                      signedInUser={username}
                    />
                  ))}
              </div>
            </td>
          </tr>
          <tr style={{ height: "15%" }}>
            <td style={{ width: "70%" }}>
              <SendChatInput addMessage={addMessage} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
