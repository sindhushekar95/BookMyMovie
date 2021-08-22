import React, { useEffect, useState } from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Header from '../../common/header/Header';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home = (props) => {

    const baseUrl = "http://localhost:8085/api/v1/";
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const history = useHistory();
    const handleMovieClick = (id) => history.push(`/details/${id}`);

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
                    <Card variant="outlined" >
                        <CardContent>
                            <Typography color="textSecondary">
                                FIND MOVIES BY:
                            </Typography>
                            <form className="dFlex alignCenter justifyCenter flexColumn p15">
                                <div className="mb15">
                                    <TextField id="moviename" label="Movie Name" />
                                </div>
                                <div className="mb15">
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">Genres</InputLabel>
                                        <Select
                                            id="demo-simple-select"
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="mb15">
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">Artist</InputLabel>
                                        <Select
                                            id="demo-simple-select"
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
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