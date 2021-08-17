import {
  Button,
  Card,
  CardActionAreaProps,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  ArrowRightAlt,
  Favorite,
  FavoriteBorder,
  Share,
} from "@material-ui/icons";
import moment from "moment";
import React, { useState } from "react";

const NewsEntry: React.FC<NewsArticle> = ({
  description,
  publishedAt,
  title,
  url,
  urlToImage,
}: NewsArticle) => {
  const [clicked, setClicked] = useState(false);
  return (
    <Card raised style={{ height: "35em", marginTop: "2em" }}>
      <CardHeader
        titleTypographyProps={{ variant: "h6" }}
        subheaderTypographyProps={{ variant: "body2" }}
        title={title}
        style={{ paddingBottom: 0, display: "block" }}
      />
      <CardContent style={{ paddingTop: 0, paddingBottom: 5 }}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs>
            <Typography variant="body2" color="textSecondary">
              {moment(publishedAt).format("MMMM Do YYYY, h:mm:ss a")}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Save" arrow>
              <IconButton onClick={() => setClicked(!clicked)}>
                {clicked ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="learn more"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowRightAlt />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
      <CardMedia
        image={urlToImage}
        title={title}
        style={{ height: 0, paddingTop: "56.25%" }}
      />
      <CardContent>
        <Typography variant="body2">{description}</Typography>{" "}
      </CardContent>
      {/* <CardActions>
          <IconButton aria-label="share">
            <Share />
          </IconButton> 
          <Button
            size="small"
            color="primary"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </Button>
          <IconButton aria-label="add to favorites">
            <Favorite />
          </IconButton>
        </CardActions> */}
    </Card>
  );
};

export default NewsEntry;
