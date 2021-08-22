import React from "react";
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Header from "../../common/header/Header";
import "./Details.css";

const Details = () => {
    return (
        <div>
            <Header></Header>
            <Typography className='backButton'>
                &lt; Back to Home
            </Typography>
            <div className="dFlex">
                <div className="leftSection">
                    Image here
                </div>
                <div className="middleSection">
                    <Typography variant="headline" component="h2">
                        Inception
                    </Typography>
                    <Typography>
                        <b>Genre: </b>
                    </Typography>
                    <Typography>
                        <b>Duration: </b>
                    </Typography>
                    <Typography>
                        <b>Release Date: </b>
                    </Typography>
                    <Typography>
                        <b>Rating: </b>
                    </Typography>
                    <Typography className="mt16">
                        <b>Plot: </b>
                    </Typography>
                    <Typography className="mt16">
                        <b>Trailer: </b>
                    </Typography>
                </div>
                <div className="rightSection">
                    <Typography>
                        <b>Rate this movie: </b>
                    </Typography>
                    <GridList cols={2}>
                        <GridListTile key="1">
                            <img src="" alt="" />
                            <GridListTileBar
                                title="movie.title"
                            />
                        </GridListTile>
                    </GridList>
                </div>
            </div>
        </div>
    )
}

export default Details;