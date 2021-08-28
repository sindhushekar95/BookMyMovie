import React, { useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useHistory, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import Link from '@material-ui/core/Link';
import Header from "../../common/header/Header";
import "./Details.css";

const Details = (props) => {
    /*Use States*/
    const [selectedMovie, setSelectedMovie] = useState([]);

    const [artists, setArtists] = useState([]);

    const [videoCode, setVideoCode] = useState("");

    const history = useHistory();

    const { id } = useParams();

    /*Back click handler*/
    const handleBackClick = () => {
        history.push('/');
    }

    useEffect(() => {

        fetch(props.baseUrl + `movies/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(response => {
                setSelectedMovie(response);
                setArtists(response.artists);
                setVideoCode(response.trailer_url.split("v=")[1].split("&")[0]);
            })
    }, []);


    return (
        <div>
            <Header id={id} baseUrl={props.baseUrl}></Header>
            <Typography className='backButton' onClick={handleBackClick}>
                &lt; Back to Home
            </Typography>
            <div className="dFlex">
                <div className="leftSection">
                    <img src={selectedMovie.poster_url} alt={selectedMovie.title} />
                </div>
                <div className="middleSection">
                    <Typography variant="headline" component="h2">
                        {selectedMovie.title}
                    </Typography>
                    <Typography>
                        <b>Genre: </b>
                        {String(selectedMovie.genres).toString().split(',').join(', ')}
                    </Typography>
                    <Typography>
                        <b>Duration: </b>
                        {selectedMovie.duration}
                    </Typography>
                    <Typography>
                        <b>Release Date: </b>
                        {new Date(selectedMovie.release_date).toDateString()}
                    </Typography>
                    <Typography>
                        <b>Rating: </b>
                        {selectedMovie.rating}
                    </Typography>
                    <Typography className="mt16">
                        <b>Plot: </b>
                        <Link className="mr15" href={selectedMovie.wiki_url} underline="always" target="_blank">
                            (Wiki Link)
                        </Link>
                        {selectedMovie.storyline}
                    </Typography>
                    <Typography className="mt16">
                        <b>Trailer: </b>
                    </Typography>
                    <YouTube videoId={videoCode} />
                </div>
                <div className="rightSection">
                    <Typography>
                        <b>Rate this movie: </b>
                    </Typography>
                    <Rating
                        defaultValue={4}
                        precision={0.5}
                        icon={<StarBorderIcon fontSize="inherit" />}
                        emptyIcon={<StarBorderIcon fontSize="inherit" className="colorBlack" />}
                    />
                    <Typography className="my16">
                        <b>Artists: </b>
                    </Typography>
                    <GridList cols={2}>
                        {artists.map(artist =>
                            <GridListTile key={artist.id}>
                                <img src={artist.profile_url} alt={artist.profile_url} />
                                <GridListTileBar
                                    title={`${artist.first_name} ${artist.last_name}`}
                                />
                            </GridListTile>
                        )}
                    </GridList>
                </div>
            </div>
        </div>
    )
}

export default Details;