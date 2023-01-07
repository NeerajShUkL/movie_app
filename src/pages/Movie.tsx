// import * as React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Box from "@mui/material/Box";
import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

const url = `https://image.tmdb.org/t/p/w400`;

const Movie: React.FC = () => {
  const { selectedMovie, movieTitle, category } = useSelector(
    (state: RootState) => state.movies
  );

  const rating = selectedMovie.vote_average / 2;

  const date =
    category === "movie"
      ? selectedMovie?.release_date
      : selectedMovie?.first_air_date;

  const newDate = date?.split("-");

  const result = newDate?.reverse()?.join("-");

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const circularProgress = (
    <Box
      sx={{
        display: "flex",
        margin: 40,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );

  const card = (
    <Card
      sx={{
        display: "flex",
        maxWidth: "55%",
        minHeight: 350,
        mx: "auto",
        marginTop: 10,
      }}
    >
      <Box sx={{ width: "50%" }}>
        <CardMedia
          component="img"
          sx={{ width: "100%" }}
          image={`${url}${selectedMovie.poster_path}`}
          alt="Live from space album cover"
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h4">
            {movieTitle?.length <= 18
              ? movieTitle
              : movieTitle.substring(0, 25) + "..."}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {selectedMovie && selectedMovie?.overview?.length <= 18
              ? selectedMovie?.overview
              : selectedMovie?.overview?.substring(0, 250) + "..."}
          </Typography>
          <Typography component="legend">Rating : </Typography>
          <Rating name="no-value" value={rating} readOnly />
          <Typography variant="body2" color="text.secondary" component="div">
            Release Date: {result}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
  return <Box>{isShown ? card : circularProgress}</Box>;
};

export default Movie;
