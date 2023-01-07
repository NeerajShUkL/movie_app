import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  fetchPapularMovies,
  RootState,
  setCategory,
  setMovieId,
  setMovieTital,
  setSearch,
  setSelectedMovie,
  setSelectedYear,
} from "../store/store";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchedValue } = useSelector((state: RootState) => state.movies);
  const page: Number = useSelector((state: RootState) => state.movies.page);
  const category: string = useSelector(
    (state: RootState) => state.movies.category
  );

  const navigate = useNavigate();

  const onSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate(`/${category}`);
    dispatch(setSearch(e.target.value));
    dispatch(setSelectedYear(""));
  };

  const handleHomeNavigation = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/${category}`);
    dispatch(fetchPapularMovies({ page, category }));
    dispatch(setSearch(""));
    dispatch(setSelectedYear(""));
    dispatch(setSelectedMovie(""));
    dispatch(setMovieTital(""));
    dispatch(setMovieId(0));
  };

  const handleMovieCategory = () => {
    dispatch(setSearch(""));
    dispatch(setSelectedYear(""));
    dispatch(setCategory("movie"));
    dispatch(setSelectedMovie(""));
    dispatch(setMovieTital(""));
    navigate("/movie");
    dispatch(setSelectedYear(""));
    document.title = "Movies";
  };
  const handleTvCategory = () => {
    dispatch(setSearch(""));
    dispatch(setCategory("tv"));
    dispatch(setSelectedMovie(""));
    dispatch(setMovieTital(""));
    navigate("/tv");
    dispatch(setSelectedYear(""));
    document.title = "TV Show";
  };

  const handleFavoriteCategory = () => {
    dispatch(setSearch(""));
    dispatch(setSelectedMovie(""));
    dispatch(setMovieTital(""));
    navigate("/favorite");
    document.title = "Favorite";
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
            onClick={handleHomeNavigation}
          >
            MOVIE APP
          </Typography>
          <Typography
            variant="subtitle1"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
            onClick={handleMovieCategory}
          >
            Movies
          </Typography>
          <Typography
            variant="subtitle1"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
            onClick={handleTvCategory}
          >
            TV Show
          </Typography>
          <Typography
            variant="subtitle1"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
            onClick={handleFavoriteCategory}
          >
            Favorite
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchedValue}
              onChange={onSearchBoxChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
