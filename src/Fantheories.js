import React, { useEffect, useState } from "react";
import { useLocation,  useNavigate,  useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import movieimg from "./searchBg.jpeg";

const Fantheories = () => {
  const location = useLocation();
  const params = useParams();
  const [user, setUser] = useState("");
  const [theories, setTheories] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");
  const [writeText, setWriteText] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isWriteDialogOpen, setIsWriteDialogOpen] = useState(false);
  const [movie, setMovie] = useState({});
  const navigate = useNavigate(); 


  useEffect(() => {
    const movieid = params.id;
    const movie = location.state.movieDetails;
    setMovie(movie);
    fetch(`https://backendformoviereview.onrender.com/FanTheory/movieTheories/${movieid}`)
      .then((response) => response.json())
      .then((data) => {
        setTheories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    const userName = sessionStorage.getItem("UserName");
    setUser(userName);
  }, []);

  const handleEditTheory = (index) => {
    if (theories[index].username === user) {
      setEditIndex(index);
      setEditText(theories[index].text);
      setIsEditDialogOpen(true);
    } else {
      alert("You are not authorized to edit the fan thoery");
    }
  };

  const handleButtonClick = () => {
    //window.location.href = '/search';
    navigate('/search')
};

  const handleDeleteTheory = (index) => {
    if (theories[index].username === user) {
      const theoryId = theories[index]._id;
      fetch(`https://backendformoviereview.onrender.com/FanTheory/deleteTheory/${theoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          setTheories((prevTheories) =>
            prevTheories.filter((_, i) => i !== index)
          );
          console.log("Theory deleted successfully:", data);
        })
        .catch((error) => {
          console.error("Error deleting theory:", error);
        });
    } else {
      alert("You are not authorized to delete this theory.");
    }
  };

  const handleEditSaveTheory = () => {
    const theoryId = theories[editIndex]._id;
    fetch(`https://backendformoviereview.onrender.com/FanTheory/editTheory/${theoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fan_theory: editText }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        fetch(`https://backendformoviereview.onrender.com/FanTheory/movieTheories/${params.id}`)
          .then((response) => response.json())
          .then((updatedTheories) => {
            setTheories(updatedTheories);
            setIsEditDialogOpen(false);
            console.log("Theory edited successfully:", data);
          })
          .catch((error) => {
            console.error("Error fetching updated theories:", error);
          });
      })
      .catch((error) => {
        console.error("Error editing theory:", error);
      });
  };

  const handleWriteSaveTheory = () => {
    const newTheory = { username: user, fan_theory: writeText };
    const movieid = params.id;
    console.log(movieid);
    fetch(`https://backendformoviereview.onrender.com/FanTheory/addTheory/${movieid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTheory),
    })
      .then((response) => response.json())
      .then((data) => {
        setTheories([...theories, data]);
        setIsWriteDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error adding theory:", error);
      });
  };

  return (
    <div
      component="main"
      maxWidth="xs"
      style={{
        backgroundImage: `url(${movieimg})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "100% 100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "100px", 
        backgroundAttachment: "fixed",
      }}
    >
      {theories.map((theory, index) => (
        <Card key={index} style={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Username:{theory.username}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {theory.fan_theory}
            </Typography>
            <Button onClick={() => handleEditTheory(index)}>Edit</Button>
            <Button onClick={() => handleDeleteTheory(index)}>Delete</Button>
          </CardContent>
        </Card>
      ))}

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogTitle>Edit Theory</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            label="Theory"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleEditSaveTheory}>Save</Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isWriteDialogOpen}
        onClose={() => setIsWriteDialogOpen(false)}
      >
        <DialogTitle>Write a Theory</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            label="Theory"
            value={writeText}
            onChange={(e) => setWriteText(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleWriteSaveTheory}>Save</Button>
        </DialogContent>
      </Dialog>
      <Button onClick={() => setIsWriteDialogOpen(true)}>Write a Theory</Button>
      <Button onClick={handleButtonClick}>Go to Search</Button>

    </div>
  );
};

export default Fantheories;
