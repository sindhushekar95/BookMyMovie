import React, { useEffect, useState } from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Header from '../../common/header/Header';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home = (props) => {

    const baseUrl = "http://localhost:8085/api/v1/";
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([]);
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const history = useHistory();
    const handleMovieClick = (id) => history.push(`/details/${id}`);
    const [openMenu, setMenuOpen] = useState();
    const handleOpenState = () => {
        setMenuOpen(true);
    }
    useEffect(() => {

        fetch(baseUrl + "movies?limit=50", {
            method: "GET",
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(response => {
                setUpcomingMovies(response.movies.filter(res => res.status === 'PUBLISHED'));
                setReleasedMovies(response.movies.filter(res => res.status === 'RELEASED'));
            })

        fetch(baseUrl + "genres", {
            method: "GET",
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(response => {
                setGenres(response.genres);
            })

        fetch(baseUrl + "artists?limit=50", {
            method: "GET",
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(response => {
                setArtists(response.artists);
            })
    }, []);

    return (
        <div>
            <Header></Header>
            <div className="banner">
                Upcoming Movies
            </div>
            <GridList cellHeight={250} cols={6} className="noWrap">
                {upcomingMovies.map(movie => (
                    <GridListTile key={movie.id}>
                        <img src={movie.poster_url} alt={movie.title} />
                        <GridListTileBar
                            title={movie.title}
                        />
                    </GridListTile>
                ))}
            </GridList>
            <div className="displayContainer dFlex">
                <div className="releasedMovie">
                    <GridList cellHeight={350} cols={4}>
                        {releasedMovies.map(movie => (
                            <GridListTile key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                                <img src={movie.poster_url} alt={movie.title} />
                                <GridListTileBar
                                    title={movie.title}
                                    subtitle={"Release Date: " + new Date(movie.release_date).toLocaleDateString('en-US', DATE_OPTIONS)}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                <div className="movieFilter">
                    <Card variant="outlined">
                        <CardContent>
                            <Typography color="textSecondary">
                                FIND MOVIES BY:
                            </Typography>
                            <form noValidate className="dFlex alignCenter justifyCenter flexColumn">
                                <FormControl className="formControl w100">
                                    <InputLabel htmlFor="movie">Movie</InputLabel>
                                    <Input id="movie" />
                                </FormControl>
                                <FormControl className="formControl w100">
                                    <InputLabel id="genres">Genres</InputLabel>
                                    <Select
                                        labelId="genres"
                                        id="genres-dropdown"
                                        open={openMenu} onChange={handleOpenState}
                                    >{genres.map((res, i) => (
                                        <MenuItem key={i}><FormControlLabel key={res.id} control={<Checkbox name={res.genre} />} label={res.genre} /></MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                <FormControl className="formControl w100">
                                    <InputLabel id="artists">Artists</InputLabel>
                                    <Select
                                        labelId="artists"
                                        id="artists-dropdown"
                                        open={openMenu} onChange={handleOpenState}
                                    >{artists.map((res, i) => (
                                        <MenuItem key={i}><FormControlLabel key={res.id} control={<Checkbox name={`${res.first_name} ${res.last_name}`} />} label={`${res.first_name} ${res.last_name}`} /></MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                <Button variant="contained" color="primary">APPLY</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Home;