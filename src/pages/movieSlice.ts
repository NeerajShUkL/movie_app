import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import axios from 'axios';

interface SelectedMovie {
  [key: string]: any;
}

interface MovieSlice {
  loading: boolean;
  page: Number;
  category: string;
  totalYear: string[];
  selectedYear: string | any;
  searchedValue: string;
  movies: SelectedMovie;
  searchedMovie: SelectedMovie;
  movieId: Number;
  movieTitle: string;
  selectedMovie: SelectedMovie;
  listOfMovies: SelectedMovie;
  favorite: Number[];
  favoriteList: SelectedMovie;
}

const initialState: MovieSlice = {
  loading: false,
  page: 1,
  category: "movie",
  totalYear: [
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
    "2007",
    "2006",
    "2005",
    "2004",
    "2003",
    "2002",
    "2001",
    "2000",
    "1999",
    "1998",
    "1997",
    "1996",
    "1995",
    "1994",
    "1993",
    "1992",
    "1991",
    "1990",
    "1989",
    "1988",
    "1987",
    "1986",
    "1985",
    "1984",
    "1983",
    "1982",
    "1981",
    "1980",
    "1979",
    "1978",
    "1977",
    "1976",
    "1975",
    "1974",
    "1973",
    "1972",
    "1971",
    "1970",
  ],
  selectedYear: "",
  searchedValue: "",
  movies: {},
  searchedMovie: {},
  movieId: 0,
  movieTitle: "",
  selectedMovie: {},
  listOfMovies: [],
  favorite: [],
  favoriteList: [],
};

// const url = `https://image.tmdb.org/t/p/w400`

export const fetchPapularMovies = createAsyncThunk(
  "movies/fetchPapularMovies",
  async ({ page, category }: { page?: Number; category?: string }) => {
    const res: SelectedMovie = await fetch(
      `https://api.themoviedb.org/3/${category}/popular?api_key=9fd5b693c3907797a39f74f5f46395e8&page=${page}&language=en-US`
    ).then((data) => data.json());
    return res;
  }
);

export const fetchSerchedMovies = createAsyncThunk(
  "movies/fetchSerchedMovies",
  async ({
    searchedValue,
    category,
  }: {
    searchedValue?: string;
    category?: string;
  }) => {
    const res: SelectedMovie = await fetch(
      `https://api.themoviedb.org/3/search/${category}?api_key=9fd5b693c3907797a39f74f5f46395e8&language=en-US&query=${searchedValue}&page=1&include_adult=false&language=en-US`
    ).then((data) => data.json());
    return res;
  }
);

export const fetchSelectedMovie = createAsyncThunk(
  "movies/fetchSelectedMovie",
  async ({ id, category }: { id?: Number | undefined; category?: string }) => {
    const res: SelectedMovie = await fetch(
      `https://api.themoviedb.org/3/${category}/${id}?api_key=9fd5b693c3907797a39f74f5f46395e8&append_to_response=videos&language=en-US`
    ).then((data) => data.json());
    return res;
  }
);

export const fetchSelectedYearMovie = createAsyncThunk(
  "movies/fetchSelectedYearMovie",
  async ({
    category,
    selectedYear,
    page,
  }: {
    category?: string;
    selectedYear?: string;
    page?: Number;
  }) => {
    const releaseDate: string =
      category === "movie" ? "primary_release_date" : "first_air_date";

    const res: SelectedMovie = await fetch(
      `https://api.themoviedb.org/3/discover/${category}?api_key=9fd5b693c3907797a39f74f5f46395e8&${releaseDate}.gte=${selectedYear}-01-01&${releaseDate}.lte=${selectedYear}-12-31&page=${page}`
    ).then((data) => data.json());
    return res;
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchedValue = action.payload;
    },
    setPage: (state, action: PayloadAction<Number>) => {
      state.page = action.payload;
    },
    setMovieId: (state, action: PayloadAction<Number>) => {
      // console.log("mi", action.payload)
      state.movieId = action.payload;
    },
    setMovieTital: (state, action: PayloadAction<string>) => {
      // console.log("mt", action.payload)
      state.movieTitle = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      // console.log("ct", action.payload)
      state.category = action.payload;
    },
    setSelectedMovie: (state, action: PayloadAction<any>) => {
      // console.log("ct", action.payload)
      state.selectedMovie = action.payload;
    },
    setListOfMovies: (state, action: PayloadAction<any>) => {
      // console.log("ct", action.payload)
      state.listOfMovies = action.payload;
    },
    setSelectedYear: (state, action: PayloadAction<any>) => {
      // console.log("ct", action.payload)
      state.selectedYear = action.payload;
    },
    setFavorite: (state, action: PayloadAction<Number>) => {
      // console.log("fid", action.payload)
      state.favorite.push(action.payload);
    },
    setFavoriteList: (state, action: PayloadAction<any>) => {
      // console.log("fid", action.payload)
      state.favoriteList.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<Number>) => {
      // state.favorite = initialState
      state.favorite.splice(
        state.favorite.findIndex((fid: Number) => fid === action.payload),
        1
      );
    },
    removeFavoriteList: (state, action: PayloadAction<Number>) => {
      // state.favorite = initialState
      state.favoriteList.splice(
        state.favoriteList.findIndex((fid: any) => fid.id === action.payload),
        1
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPapularMovies.pending, (state) => {
      // console.log("fpmr",action.payload)
      state.loading = true;
    });
    builder.addCase(fetchPapularMovies.fulfilled, (state, action) => {
      // console.log("fpmr",action.payload)
      state.loading = false;
      state.movies = action.payload;
    });
    builder.addCase(fetchSerchedMovies.pending, (state) => {
      // console.log("fpmr",action.payload)
      state.loading = true;
    });
    builder.addCase(fetchSerchedMovies.fulfilled, (state, action) => {
      // console.log("fsm", action.payload)
      state.loading = false;
      state.searchedMovie = action.payload;
    });
    builder.addCase(fetchSelectedMovie.pending, (state) => {
      // console.log("fpmr",action.payload)
      state.loading = true;
    });
    builder.addCase(fetchSelectedMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedMovie = action.payload;
    });
    builder.addCase(fetchSelectedYearMovie.pending, (state) => {
      // console.log("fpmr",action.payload)
      state.loading = true;
    });
    builder.addCase(fetchSelectedYearMovie.fulfilled, (state, action) => {
      // console.log("fsym", action.payload)
      state.loading = false;
      state.movies = action.payload;
    });
  },
});

export const {
  setSearch,
  setPage,
  setMovieId,
  setMovieTital,
  setCategory,
  setSelectedMovie,
  setListOfMovies,
  setSelectedYear,
  setFavorite,
  setFavoriteList,
  removeFavorite,
  removeFavoriteList,
} = movieSlice.actions;

export default movieSlice.reducer;

// https://api.themoviedb.org/3/discover/movie?api_key=###&primary_release_date.gte=1990-01-01&primary_release_date.lte=1990-12-31
