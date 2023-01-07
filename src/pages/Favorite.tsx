import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import MovieCard from "./MovieCard";

interface ListOfMovies {
  [key: string]: any;
}

const url = `https://image.tmdb.org/t/p/w300`;

const Favorite = () => {
  const favoriteList: ListOfMovies = useSelector(
    (state: RootState) => state.movies.favoriteList
  );
  const favoriteMovies: Number[] = useSelector(
    (state: RootState) => state.movies.favorite
  );

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
        marginTop: 30,
        marginLeft: "45%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );

  const movieCardShow =
    favoriteList?.length === 0 ? (
      <Box
        sx={{
          display: "flex",
          marginTop: 30,
          marginLeft: "45%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={0}>
          <h3>There is no Favorite Item</h3>
        </Paper>
      </Box>
    ) : (
      favoriteList?.map((movieData: ListOfMovies) => {
        let bool = false;
        favoriteMovies.map((fid: Number) => {
          if (fid === movieData.id) {
            bool = true;
          }
        });
        if (bool) {
          return (
            <Grid item xs={4} sm={3} md={2} key={movieData.id}>
              <MovieCard
                favorite={bool}
                id={movieData.id}
                poster_path={`${url}${movieData.poster_path}`}
                title={movieData.title}
              />
            </Grid>
          );
        }
      })
    );

  const empty = (
    <Typography
      display="inline"
      text-align="left"
      variant="h6"
      sx={{
        maxWidth: 300,
        marginTop: 30,
        marginLeft: "45%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Please add your Favorite Movies & TV Show
    </Typography>
  );

  return (
    <Box sx={{ flexGrow: 1, mx: "auto", marginTop: 10, p: 3 }}>
      <Typography
        display="inline"
        text-align="left"
        variant="h6"
        sx={{ maxWidth: 300 }}
      >
        Favorite Movies & TV Show
      </Typography>
      <Grid container spacing={2}>
        {isShown ? movieCardShow : circularProgress}
      </Grid>
    </Box>
  );
};

export default Favorite;
