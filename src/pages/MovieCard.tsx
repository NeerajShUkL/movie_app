import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AppDispatch, fetchSelectedMovie, removeFavorite, removeFavoriteList, RootState, setFavorite, setFavoriteList, setMovieId, setMovieTital } from '../store/store';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect } from 'react';
import { set } from 'immer/dist/internal';

interface favorite {
  [key: string]: any
}

interface movieCard {
  favorite: boolean,
  id: Number,
  poster_path: string,
  title: string,
}

const MovieCard = (props: movieCard) => {

  const { favorite, id, poster_path, title } = props

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const category: string = useSelector((state: RootState) => state.movies.category)
  const favoriteMovies: Number[] = useSelector((state: RootState) => state.movies.favorite)
  // console.log("fav--",favoriteMovies)

  const Color = favorite? {color: "red"} : {color: "grey"}

  const handleMovieCardDetail = () => {
    navigate(`/${category}/${id}`);
    dispatch(setMovieId(id))
    dispatch(setMovieTital(title))
    dispatch(fetchSelectedMovie({ id, category }))
    document.title = `${category === 'tv' ? 'TV Show' : 'Movies'}/${title}`
  }
  
  const handleFavoriteIconClick = () => {
    if (favorite) {
      dispatch(removeFavorite(id))
      dispatch(removeFavoriteList(id))
    } else {
      dispatch(setFavorite(id))
      dispatch(setFavoriteList(props))
    }

  }
 
 

  return (
    <Card sx={{ maxWidth: 300 }} >
      <CardActionArea>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteIconClick} >
          <FavoriteIcon sx={Color}/>
        </IconButton>
        <CardMedia
          component="img"
          width="200"
          image={poster_path}
          alt="green iguana"
          onClick={handleMovieCardDetail}
        />
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;