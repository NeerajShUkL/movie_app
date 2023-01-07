import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  fetchPapularMovies,
  fetchSelectedYearMovie,
  fetchSerchedMovies,
  removeFavorite,
  RootState,
  setFavorite,
  setListOfMovies,
  setPage,
  setSelectedYear,
} from "../store/store";
import MovieCard from "./MovieCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  BottomNavigation,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface Movies {
  [key: string]: any;
}

interface ListOfMovies {
  [key: string]: any;
}

const url = `https://image.tmdb.org/t/p/w300`;

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchedValue: string = useSelector(
    (state: RootState) => state.movies.searchedValue
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.movies.loading
  );
  const page: Number = useSelector((state: RootState) => state.movies.page);
  const category: string = useSelector(
    (state: RootState) => state.movies.category
  );
  const totalYear: string[] = useSelector(
    (state: RootState) => state.movies.totalYear
  );
  const selectedYear: string = useSelector(
    (state: RootState) => state.movies.selectedYear
  );
  const favoriteMovies: Number[] = useSelector(
    (state: RootState) => state.movies.favorite
  );

  const movies: Movies = useSelector((state: RootState) => state.movies.movies);
  // console.log("movies", movies)
  const searchedMovie: Movies = useSelector(
    (state: RootState) => state.movies.searchedMovie
  );
  const listOfMovies: ListOfMovies = useSelector(
    (state: RootState) => state.movies.listOfMovies
  );
  // console.log("lom", listOfMovies)
  const Category = category === "movie" ? "Popular Movies" : "Papular TV Show";

  let maxPage = movies.total_pages > 500 ? 500 : movies.total_pages;
  if (searchedValue) {
    maxPage = searchedMovie.total_pages > 500 ? 500 : searchedMovie.total_pages;
  }
  useEffect(() => {
    if (category) {
      if (searchedValue) {
        dispatch(fetchSerchedMovies({ searchedValue, category }));
      } else if (selectedYear) {
        dispatch(fetchSelectedYearMovie({ category, selectedYear, page }));
      } else {
        dispatch(fetchPapularMovies({ page, category }));
      }
    }
  }, [searchedValue, page, category, selectedYear]);

  useEffect(() => {
    let mResults: Movies;
    if (searchedValue) {
      mResults = searchedMovie.results;
      dispatch(setListOfMovies(mResults));
    } else {
      mResults = movies.results;
      dispatch(setListOfMovies(mResults));
    }
  }, [movies, page, searchedValue]);

  const circularProgress = (
    <Box
      sx={{
        display: "flex",
        marginTop: 20,
        marginLeft: "45%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );

  const movieCardShow =
    listOfMovies?.length === 0 ? (
      <Box
        sx={{
          display: "flex",
          marginTop: 20,
          marginLeft: "45%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={0}>
          <h3>There is no Item</h3>
        </Paper>
      </Box>
    ) : (
      listOfMovies?.map((movieData: Movies) => {
        let bool = false;
        favoriteMovies.map((fid: Number) => {
          if (fid === movieData.id) {
            bool = true;
          }
        });

        return (
          <Grid item xs={4} sm={3} md={2} key={movieData.id}>
            <MovieCard
              favorite={bool}
              id={movieData.id}
              poster_path={`${url}${movieData.poster_path}`}
              title={
                category === "movie"
                  ? movieData.original_title
                  : movieData.original_name
              }
            />
          </Grid>
        );
      })
    );

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPage(Number(value)));
  };

  const handleSelectedYear = (event: SelectChangeEvent) => {
    const year = event.target.value as string;
    dispatch(setSelectedYear(year));
  };
  return (
    <Box sx={{ flexGrow: 1, mx: "auto", marginTop: 10, p: 3 }}>
      <Grid
        container
        sx={{ justifyContent: "space-between", width: "100%", marginBottom: 2 }}
      >
        <Typography
          display="inline"
          text-align="left"
          variant="h6"
          sx={{ maxWidth: 300 }}
        >
          {Category}
        </Typography>
        <Box display="inline" text-align="Right">
          <FormControl sx={{ m: 1, width: 150 }}>
            <>
              <InputLabel id="demo-simple-select-label">
                Release Year
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedYear}
                label="Release Year"
                onChange={handleSelectedYear}
              >
                {totalYear.map((year) => {
                  return (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
            </>
          </FormControl>
        </Box>
      </Grid>
      <Grid container spacing={2}>
        {loading ? circularProgress : movieCardShow}
      </Grid>
      <BottomNavigation sx={{ position: "fixed", bottom: 0, width: 1.0 }}>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          sx={{ marginTop: 1.5 }}
        >
          <Pagination
            count={maxPage}
            shape="rounded"
            onChange={handlePagination}
          />
        </Stack>
      </BottomNavigation>
    </Box>
  );
};

export default Home;
