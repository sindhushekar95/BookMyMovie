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
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Header from '../../common/header/Header';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home = (props) => {

    const baseUrl = "http://localhost:8085/api/v1/";
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);
    const [originalReleasedMovies, setOriginalReleasedMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([]);
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const history = useHistory();
    const handleMovieClick = (id) => history.push(`/details/${id}`);
    const [movieFilterHandler, setMovieFilterHandler] = useState("");
    const [startDateHandler, setStartDateHandler] = useState("");
    const [endDateHandler, setEndDateHandler] = useState("");
    const [genreName, setGenreName] = useState([]);
    const [artistName, setArtistName] = useState([]);
    const [noMovieError, setNoMovieError] = useState("");

    const handleGenreChange = (event) => {
        setGenreName(event.target.value);
    };

    const handleArtistChange = (event) => {
        setArtistName(event.target.value);
    };

    const applyFilterHandler = () => {
        console.log(movieFilterHandler, genreName, artistName, startDateHandler, endDateHandler);
        console.log(releasedMovies);
        let totalRes = [];
        if (movieFilterHandler) {
            releasedMovies.forEach(res => {
                if (res.title.toLowerCase() === movieFilterHandler.toLowerCase()) {
                    totalRes.push(res);
                }
            });
        }
        if (genreName.length > 0) {
            originalReleasedMovies.forEach(res => {
                res.genres.forEach(item => {
                    if (genreName.includes(item)) {
                        totalRes.push(res);
                    }
                })
            });
            setReleasedMovies(totalRes);
        }
        if (artistName.length > 0) {
            originalReleasedMovies.forEach(res => {
                res.artists.forEach(item => {
                    if (artistName.includes(item.first_name + " " + item.last_name)) {
                        totalRes.push(res);
                    }
                })
            });
            setReleasedMovies(totalRes);
        }
        if (startDateHandler) {
            originalReleasedMovies.forEach(res => {
                if (res.release_date >= startDateHandler) {
                    totalRes.push(res);
                }
            });
            setReleasedMovies(totalRes);
        }
        if (endDateHandler) {
            originalReleasedMovies.forEach(res => {
                if (res.release_date <= endDateHandler) {
                    totalRes.push(res);
                }
            });
            setReleasedMovies(totalRes);
        }

        if (totalRes.length > 0) {
            let removeDuplicateFilterSet = totalRes.filter((item, index) => {
                return totalRes.indexOf(item) === index;
            });
            setNoMovieError("");
            setReleasedMovies(removeDuplicateFilterSet);
        } else {
            setNoMovieError("No Movies Found. Please try with a different filter criteria");
        }

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
                setOriginalReleasedMovies(response.movies.filter(res => res.status === 'RELEASED'));
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
                    {noMovieError.length === 0 &&
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
                    }
                    {noMovieError}
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
                                    <Input id="movie" onChange={(event) => setMovieFilterHandler(event.target.value)} />
                                </FormControl>
                                <FormControl className="formControl w100">
                                    <InputLabel id="genres">Genres</InputLabel>
                                    <Select
                                        labelId="genres"
                                        multiple
                                        id="genres-dropdown"
                                        value={genreName}
                                        onChange={handleGenreChange}
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                    >{genres.map((res) => (
                                        <MenuItem key={res.genre} value={res.genre}>
                                            <Checkbox checked={genreName.indexOf(res.genre) > -1} />
                                            <ListItemText primary={res.genre} />
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                <FormControl className="formControl w100 mb15">
                                    <InputLabel id="artists">Artists</InputLabel>
                                    <Select
                                        labelId="artists"
                                        multiple
                                        id="artists-dropdown"
                                        value={artistName}
                                        onChange={handleArtistChange}
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                    >{artists.map((res) => (
                                        <MenuItem key={`${res.first_name} ${res.last_name}`} value={`${res.first_name} ${res.last_name}`}>
                                            <Checkbox checked={artistName.indexOf(`${res.first_name} ${res.last_name}`) > -1} />
                                            <ListItemText primary={`${res.first_name} ${res.last_name}`} />
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                <FormControl className="formControl w100">
                                    <TextField
                                        id="startDate"
                                        label="Release Date Start"
                                        type="date"
                                        onChange={(event) => setStartDateHandler(event.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                                <FormControl className="formControl w100">
                                    <TextField
                                        id="endDate"
                                        label="Release Date End"
                                        type="date"
                                        onChange={(event) => setEndDateHandler(event.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                                <Button variant="contained" color="primary" onClick={applyFilterHandler}>APPLY</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Home;