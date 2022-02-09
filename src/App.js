import logo1 from "./tulips.jpg";
import logo2 from "./laptop.jpg";
import logo3 from "./pencils.jpg";
import "./App.css";
import { Avatar, Card } from "@mui/material";
import React from "react";
import { pink } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

function App() {
  return (
    <div className="App">
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Avatar sx={{ bgcolor: pink[50], width: 80, height: 80 }}>
        <FavoriteBorderIcon sx={{ color: pink[500], width: 50, height: 50 }} />
      </Avatar>
      <br></br>
      <header className="App-header">Hi there, I'm Tzipora.</header>

      <p>
        Welcome to my personal home page. Here is where you can see my first
        attempt at using React to create a real live website. Learning new
        coding and technology skills is something I find fun and interesting. I
        am currently in the process of earning my B.S in computer Science and
        have the oppurtunity to learn new things every day.
        <br></br>Scroll to read more about me :)
      </p>
      <KeyboardDoubleArrowDownIcon
        className="App-down-arrow"
        sx={{ color: pink[500], width: 80, height: 100 }}
      />

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <header className="App-sub-header">Some things I enjoy</header>

      <div className="cardDiv">
        <Card className="card" sx={{ maxWidth: 345 }}>
          <CardMedia component="img" height="140" image={logo1} alt="Tulips" />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="#e91e63"
            >
              Nature
            </Typography>
            <Typography variant="body2" color="#e91e63">
              I love everything outdoors and beautiful! I love spending the day
              outside in (almost) any weather.
            </Typography>
          </CardContent>
        </Card>

        <Card className="card" sx={{ maxWidth: 345 }}>
          <CardMedia component="img" height="140" image={logo2} alt="laptop" />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="#e91e63"
            >
              Technology
            </Typography>
            <Typography variant="body2" color="#e91e63">
              Technology, specifically computer programming, is an interest of
              mine. Learning new tech skills and concepts is something I am
              excited about.
            </Typography>
          </CardContent>
        </Card>

        <Card className="card" sx={{ maxWidth: 345 }}>
          <CardMedia component="img" height="140" image={logo3} alt="Pencils" />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="#e91e63"
            >
              Drawing
            </Typography>
            <Typography variant="body2" color="#e91e63">
              Though it's a skill I have not really developed, drawing is a
              hobby of mine. I like to doodle and color to relax and unwind.
            </Typography>
          </CardContent>
        </Card>
      </div>

      <header className="App-sub-header">Contact Info</header>

      <p>
        Email: rgutmann4@student.touro.edu
        <br></br>
        Phone: 973.930.5132
        <br></br>
      </p>
    </div>
  );
}

export default App;
