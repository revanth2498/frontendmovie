import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const MovieTile = ({ movie, handleReviewsClick, FanTheoriesClick,handleDeleteMovie }) => {
  return (
    <Card variant="outlined" style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {movie.Title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Year: {movie.Year}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Language: {movie.Language}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Runtime: {movie.Runtime}
        </Typography>
        <div style={{ marginTop: '10px' }}>
          <Button variant="contained" onClick={() => handleReviewsClick(movie)}>
            Reviews
          </Button>
          <Button variant="contained" onClick={() => FanTheoriesClick(movie)} style={{ marginLeft: '10px' }}>
            Fan Theories
          </Button>
          <Button variant="contained" onClick={() => handleDeleteMovie(movie)} style={{ marginLeft: '20px' }}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieTile;



