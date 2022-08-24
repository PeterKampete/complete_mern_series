import React from "react";
import { useStyles } from "./Home.styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  unicornbikeImg,
} from "@material-ui/core";
import { bgImg } from "../../assets/images";
const Home = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography variant="h6" className={classes.title}>
        Home Page
      </Typography>
      <CardMedia
        className={classes.media}
        image={bgImg}
        title="Unicorn Bicycle"
      />
      <CardContent>
        <Typography variant="body2" component="p">
          Welcome to the MERN Skeleton home page.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Home;
