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

function Message(props) {
  return (
    <span
      style={{
        textAlign: /*props.userName == this.userName ? "left" : */ "right",
        display: "block",
      }}
    >
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
        <ListItemText primary={props.name} />
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

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [chatRoomsList, setChatRoomsList] = useState([]);

  const addMessage = (text) => {
    const newMessages = [...messages, { text }];
    setMessages(newMessages);
  };

  const addChatRoom = (name) => {
    const chat = {
      name: name,
    };

    fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chat),
    }).then(
      fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats")
        .then((response) => response.json())
        .then((data) => setChatRoomsList(data.results))
    );
  };

  return (
    <div className="App">
      <table id="displayBox">
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
              &nbsp;Chat Rooms
              <InputNewChat addChatRoom={addChatRoom} />
              <List>
                {chatRoomsList.map(({ room }, index) => (
                  <ChatRoomListItem
                    key={index}
                    index={index}
                    name={room.name}
                  />
                ))}
              </List>
            </td>
            <td style={{ verticalAlign: "top", width: "70%" }}>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  index={index}
                  userName={message.userName}
                  text={message.text}
                />
              ))}
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