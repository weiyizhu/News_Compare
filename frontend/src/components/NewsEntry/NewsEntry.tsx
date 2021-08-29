import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { ArrowRightAlt, Favorite, FavoriteBorder } from "@material-ui/icons";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators } from "../../state";
import { Status } from "../../state/action-types/statusActionTypes";
import { savedNews } from "../../state/action-types/userActionTypes";
import { RootState } from "../../state/reducers";
import { NewsArticle } from "../../types";

const NewsEntry: React.FC<NewsArticle> = ({
  description,
  publishedAt,
  title,
  url,
  urlToImage,
}: NewsArticle) => {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const savedNews = useSelector<RootState, savedNews[] | undefined>(
    (state) => state.user.savedNews
  );
  const history = useHistory();
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.user.isLoggedIn
  );

  const handleSavedNews = () => {
    if (!isLoggedIn) {
      dispatch(
        actionCreators.updateStatus(Status.ERROR, "You have to log in first")
      );
      history.push("/login");
      return;
    }
    if (!clicked) {
      dispatch(
        actionCreators.addSavedNews(
          title,
          publishedAt,
          urlToImage,
          url,
          savedNews
        )
      );
    } else {
      dispatch(
        actionCreators.deleteSavedNews(
          title,
          publishedAt,
          urlToImage,
          url,
          savedNews
        )
      );
    }
    setClicked(!clicked);
  };
  return (
    <Card raised style={{ height: "35em", marginTop: "2em" }}>
      <CardHeader
        titleTypographyProps={{ variant: "h6" }}
        subheaderTypographyProps={{ variant: "body2" }}
        title={title ?? "Untitled"}
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
              <IconButton onClick={handleSavedNews}>
                {clicked ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Learn more" arrow>
              <IconButton
                aria-label="learn more"
                onClick={() => window.open(url, "blank")}
              >
                <ArrowRightAlt />
              </IconButton>
            </Tooltip>
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
    </Card>
  );
};

export default NewsEntry;
