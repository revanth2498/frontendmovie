import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import MovieTile from "./MovieTile";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import movieimg from "./searchBg.jpeg";

const SearchFilter = () => {
  const [user, setUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortMethod, setSortMethod] = useState("year");
  const [newMovieInput, setNewMovieInput] = useState("");
  const [newMovieDirector, setNewMovieDirector] = useState("");
  const [newMovieWriter, setNewMovieWriter] = useState("");
  const [newMovieActors, setNewMovieActors] = useState("");
  const [newMovieYear,setNewMovieYear]=useState(0);
  const [rated,setRated]=useState("")
  const [released,setReleased]=useState("")
  const [runtime,setRunTime]=useState("")
  const [genre,setGenre]=useState("")
  const [language,setLanguage]=useState("")
  const [country,setCountry]=useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [isAddMovieDialogOpen, setAddMovieDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handleReviewsClick = (movie) => {
    console.log(movie);
    const reviews = [
      { text: "great movie", rating: 5 },
      { text: "excellent", rating: 4 },
    ];
    const url = "/movie-details/" + movie._id;
    navigate(url, { state: { movieDetails: movie, reviews } });
  };

  const FanTheoriesClick = (movie) => {
    console.log(movie);
    const url = "/fantheories/" + movie._id;
    navigate(url, { state: { movieDetails: movie } });
  };

  // const handleSearch = (event) => {
  //   const searchTerm = event.target.value;
  //   setSearchTerm(searchTerm);

  //   const filtered = items.filter((item) =>
  //     item.Title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredItems(filtered);
  // };

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };
  const handleNewMovieInputChange = (event) => {
    setNewMovieInput(event.target.value);
  };

  const handleNewMovieDirectorChange = (event) => {
    setNewMovieDirector(event.target.value);
  };

  const handleNewMovieWriterChange = (event) => {
    setNewMovieWriter(event.target.value);
  };

  const handleNewMovieActorsChange = (event) => {
    setNewMovieActors(event.target.value);
  };

  const handleYearChange = (event) => {
    setNewMovieYear(event.target.value);
  };

  const handleRatingChange= (event) => {
    setRated(event.target.value);
  };

  const handleReleasedChange= (event) => {
    setReleased(event.target.value);
  };

  const handleRunTimeChange= (event) => {
    setRunTime(event.target.value);
  };

  
  const handleGenreChange= (event) => {
    setGenre(event.target.value);
  };

  

  const handleLanguageChange= (event) => {
    setLanguage(event.target.value);
  };

  const handleCountryChange= (event) => {
    setCountry(event.target.value);
  };
  

  const handleOpenAddMovieDialog = () => {
    setAddMovieDialogOpen(true);
  };

  const handleCloseAddMovieDialog = () => {
    setAddMovieDialogOpen(false);
  };

  const handleDeleteMovie = async (movie) => {
    if (user === 'adminUser') {
      try {
        const response = await fetch(`https://backendformoviereview.onrender.com/Movie/deleteMovie/${movie._id}`, {
          method: "DELETE"
        });
        const data = await response.json();
        console.log(data)
        if (data.message === "Movie Deleted") {
          const updatedMoviesResponse = await fetch(
            "https://backendformoviereview.onrender.com/Movie/getMovies"
          );
          const updatedMoviesData = await updatedMoviesResponse.json();
          setItems(updatedMoviesData.requests);
          setFilteredItems(updatedMoviesData.requests);
        } else {
          console.error("Deleting movie failed:", data.message);
        }
      } catch (error) {
        console.error("Deleting movie failed:", error.message);
      }
    } else {
      alert("You don't have access to delete movies. Only admins are allowed to delete movies.");
    }
  };


  const handleAddMovie = async () => {
    if(user==='adminUser')
    {
    try {
      const newMovieData = {
        DirectorName: newMovieDirector,
        Writer: newMovieWriter.split(",").map((name) => name.trim()),
        actors: newMovieActors.split(",").map((name) => name.trim()),
        Title: newMovieInput,
        Year: newMovieYear,
        Rated: rated,
        Released: released,
        Runtime: runtime,
        Genre: genre,
        language: language,
        Country: country,
      };
      console.log(newMovieData)
      const response = await fetch("https://backendformoviereview.onrender.com/Movie/addMovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovieData),
      });

      const data = await response.json();

      if (data.message === "Movie created") {
        const updatedMoviesResponse = await fetch(
          "https://backendformoviereview.onrender.com/Movie/getMovies"
        );
        const updatedMoviesData = await updatedMoviesResponse.json();
        setItems(updatedMoviesData.requests);
        setFilteredItems(updatedMoviesData.requests);
        setNewMovieInput(""); 
        setNewMovieDirector("");
        setNewMovieWriter("");
        setNewMovieActors("");
        setLanguage("");
        setNewMovieYear(0);
        setCountry("");
        setGenre("");
        setRated("");
        setReleased("");
        setRunTime("");
        setAddMovieDialogOpen(false); 
      } else {
        console.error("Adding movie failed:", data.message);
      }
    } catch (error) {
      console.error("Adding movie failed:", error.message);
    }
  }else{
    alert("You dont have access to add movies only admin is allowd to add a movie.")
  }
  };

  const sortMovies = (movies) => {
    if (sortMethod === "year") {
      return [...movies].sort((a, b) => a.Year - b.Year);
    } else if (sortMethod === "runtime") {
      return [...movies].sort(
        (a, b) => parseInt(a.Runtime) - parseInt(b.Runtime)
      );
    }
    return movies;
  };
  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  // useEffect(() => {
  //   const uservalue = sessionStorage.getItem("UserName");
  //   console.log(uservalue);
  //   setUser(uservalue);
  //   fetch(`https://backendformoviereview.onrender.com/Movie/getMovies?page=${currentPage}&limit=${itemsPerPage}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.requests);
  //       setItems(data.requests);
  //       setFilteredItems(data.requests);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [currentPage]);

  // useEffect(() => {
  //   const sortedMovies = sortMovies(filteredItems);
  //   setFilteredItems(sortedMovies);
  // }, [sortMethod, filteredItems]);
  
  useEffect(() => {
    const uservalue = sessionStorage.getItem("UserName");
    console.log(uservalue);
    setUser(uservalue);
    fetch(`https://backendformoviereview.onrender.com/Movie/getMovies?page=${currentPage}&limit=${itemsPerPage}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.requests);
        setItems(data.requests);
        setFilteredItems(data.requests);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  useEffect(() => {
    const sortedMovies = sortMovies(items);
    setFilteredItems(sortedMovies);
  }, [sortMethod, items]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      setFilteredItems(items); 
    } else {
      const filtered = items.filter((item) =>
        item.Title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered); 
    }
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
        alignItems: "flex-start", 
        justifyContent: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          sx={{ marginRight: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddMovieDialog}
          style={{ marginLeft: "10px" }}
        >
          Add Movie
        </Button>
        <Select
          value={sortMethod}
          onChange={handleSortChange}
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="year">Sort by Year</MenuItem>
          <MenuItem value="runtime">Sort by Runtime</MenuItem>
        </Select>
      </div>
      <List>
        {filteredItems.map((item, index) => (
          <MovieTile
            key={index}
            movie={item}
            handleReviewsClick={handleReviewsClick}
            FanTheoriesClick={FanTheoriesClick}
            handleDeleteMovie={handleDeleteMovie}
          />
        ))}
      </List>
      <Button onClick={handlePrevPage}>Previous</Button>
      <Button onClick={handleNextPage}>Next</Button>
      <Dialog open={isAddMovieDialogOpen} onClose={handleCloseAddMovieDialog}>
        <DialogTitle>Add New Movie</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            value={newMovieInput}
            onChange={handleNewMovieInputChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Director(s)"
            variant="outlined"
            value={newMovieDirector}
            onChange={handleNewMovieDirectorChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Writer(s)"
            variant="outlined"
            value={newMovieWriter}
            onChange={handleNewMovieWriterChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Actor(s)"
            variant="outlined"
            value={newMovieActors}
            onChange={handleNewMovieActorsChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Year"
            variant="outlined"
            value={newMovieYear}
            onChange={handleYearChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Rating"
            variant="outlined"
            value={rated}
            onChange={handleRatingChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Released"
            variant="outlined"
            value={released}
            onChange={handleReleasedChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="RunTime"
            variant="outlined"
            value={runtime}
            onChange={handleRunTimeChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Genre"
            variant="outlined"
            value={genre}
            onChange={handleGenreChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
           <TextField
            label="Language"
            variant="outlined"
            value={language}
            onChange={handleLanguageChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
           <TextField
            label="Country"
            variant="outlined"
            value={country}
            onChange={handleCountryChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddMovieDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddMovie} color="primary">
            Add Movie
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SearchFilter;
