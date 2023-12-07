import React, { useEffect, useState } from "react";
import { useLocation,  useNavigate,  useParams,Link} from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import movieimg from "./searchBg.jpeg";

const MovieDetails = () => {
  const location = useLocation();
  const [user, setUser] = useState("");
  const params = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    console.log("testing");
    const movieid = params.id;
    console.log(movieid);
    const movie = location.state.movieDetails;
    setMovie(movie);
    fetch(`https://backendformoviereview.onrender.com/Review/movieReviews/${movieid}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setReviews(data);
        const totalRating = data.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        const avgRating = data.length > 0 ? totalRating / data.length : 0;
        setAverageRating(avgRating);
      })
      .catch((error) => {
        console.log(error);
      });
    const userName = sessionStorage.getItem("UserName");
    console.log(userName);
    setUser(userName);
    console.log(userName);
  }, []);

  const [reviews, setReviews] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); 
  const [editText, setEditText] = useState(""); 
  const [writeText, setWriteText] = useState(""); 
  const [rating, setRating] = useState(0); 
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); 
  const [isWriteDialogOpen, setIsWriteDialogOpen] = useState(false); 
  const [averageRating, setAverageRating] = useState(0);
  const [movie, setMovie] = useState({});


    const handleButtonClick = () => {
      console.log(window.location.href)
        //window.location.href = '/search';
        navigate('/search')
    };

  const handleEditReview = (index) => {
    if (reviews[index].username === user) {
      setEditIndex(index);
      setEditText(reviews[index].text);
      setRating(reviews[index].rating);
      setIsEditDialogOpen(true);
    } else {
      alert("You are not authorized to edit the review");
    }
  };

  const handleDeleteReview = (index) => {
    if (reviews[index].username === user) {
      const reviewIdToDelete = reviews[index]._id; 
      fetch(`https://backendformoviereview.onrender.com/Review/deleteReview/${reviewIdToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            const updatedReviews = reviews.filter((_, i) => i !== index);
            setReviews(updatedReviews);
            const totalRating = updatedReviews.reduce(
              (acc, curr) => acc + curr.rating,
              0
            );
            const avgRating =
              updatedReviews.length > 0
                ? totalRating / updatedReviews.length
                : 0;
            setAverageRating(avgRating);
            console.log("Review deleted successfully.");
          } else {
            throw new Error("Failed to delete review");
          }
        })
        .catch((error) => {
          console.error("Error deleting review:", error);
        });
    } else {
      alert("You are not authorized to delete this review.");
    }
  };

  const handleEditSave = () => {
    if (reviews[editIndex].username === user) {
      const reviewIdToEdit = reviews[editIndex]._id; 
      const editedReviewData = {
        review: editText,
        rating: rating,
      };

      fetch(`https://backendformoviereview.onrender.com/Review/editReview/${reviewIdToEdit}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedReviewData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Failed to edit review");
        })
        .then((data) => {
          const updatedReviews = [...reviews];
          updatedReviews[editIndex].review = editText;
          updatedReviews[editIndex].rating = rating;
          setReviews(updatedReviews);
          setIsEditDialogOpen(false);
          const totalRating = updatedReviews.reduce(
            (acc, curr) => acc + curr.rating,
            0
          );
          const avgRating =
            updatedReviews.length > 0 ? totalRating / updatedReviews.length : 0;
          setAverageRating(avgRating);
          console.log("Review edited successfully:", data);
        })
        .catch((error) => {
          console.error("Error editing review:", error);
        });
    } else {
      alert("You are not authorized to edit this review.");
    }
  };

  const handleWriteSave = () => {
    const newReview = { username: user, review: writeText, rating: rating };
    const movieid = params.id;
    console.log(movieid);
    fetch(`https://backendformoviereview.onrender.com/Review/addReview/${movieid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to add review");
      })
      .then((data) => {
        console.log(data);
        setWriteText('')
        setRating(0)
        const updatedReviews = [...reviews, data];
        setReviews(updatedReviews);
        const totalRating = updatedReviews.reduce(
          (acc, curr) => acc + curr.rating,
          0
        );
        const avgRating = totalRating / updatedReviews.length;
        setAverageRating(avgRating);
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });

    setIsWriteDialogOpen(false);
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
      <Typography variant="h4" gutterBottom>
        Movie:{movie.Title}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Released in: {movie.Year}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Average Rating: {averageRating.toFixed(1)}
      </Typography>
      {reviews.map((review, index) => (
        <Card key={index} style={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h5" component="h2">
             Username: {review.username} 
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {review.review}
              <br />
              Rating: {review.rating}
            </Typography>
            <Button onClick={() => handleEditReview(index)}>Edit</Button>
            <Button onClick={() => handleDeleteReview(index)}>Delete</Button>
          </CardContent>
        </Card>
      ))}

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            label="Review"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
          />
          <Button onClick={handleEditSave}>Save</Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isWriteDialogOpen}
        onClose={() => setIsWriteDialogOpen(false)}
      >
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            label="Review"
            value={writeText}
            onChange={(e) => setWriteText(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
          />
          <Button onClick={handleWriteSave}>Save</Button>
        </DialogContent>
      </Dialog>
      <Button onClick={() => setIsWriteDialogOpen(true)}>Write a Review</Button>
      <Button onClick={handleButtonClick}>Go to Search</Button>
    </div>
  );
};

export default MovieDetails;
