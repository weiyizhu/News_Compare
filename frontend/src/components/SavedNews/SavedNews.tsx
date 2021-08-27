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
import { ArrowRightAlt, Close } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import { RootState } from "../../state/reducers";
import { savedNews } from "../../state/action-types/userActionTypes";
import moment from "moment";

const SavedNews = () => {
  const savedNews = useSelector<RootState, savedNews[] | undefined>(
    (state) => state.user.savedNews
  );
  const dispatch = useDispatch();
  const handleSavedNews = (
    title: string,
    date: string,
    imgUrl: string,
    newsUrl: string
  ) => {
    dispatch(
      actionCreators.deleteSavedNews(title, date, imgUrl, newsUrl, savedNews)
    );
  };
  return (
    <Grid container spacing={3}>
      {savedNews &&
        savedNews.map((news) => (
          <Grid item xs={12} md={6}>
            <Card raised>
              <CardHeader
                titleTypographyProps={{ variant: "h6" }}
                subheaderTypographyProps={{ variant: "body2" }}
                title={news.title ?? "Untitled"}
                action={
                  <Tooltip title="Delete" arrow>
                    <IconButton
                      onClick={() =>
                        handleSavedNews(
                          news.title,
                          news.date,
                          news.imgUrl,
                          news.newsUrl
                        )
                      }
                    >
                      <Close />
                    </IconButton>
                  </Tooltip>
                }
                style={{ paddingBottom: 0 }}
              />
              <CardContent style={{ paddingTop: 0, paddingBottom: 5 }}>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item xs>
                    <Typography variant="body2" color="textSecondary">
                      {moment(news.date).format("MMMM Do YYYY, h:mm:ss a")}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Learn more" arrow>
                      <IconButton
                        aria-label="learn more"
                        onClick={() => window.open(news.newsUrl, "blank")}
                      >
                        <ArrowRightAlt />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </CardContent>
              <CardMedia
                image={news.imgUrl}
                title={news.title ?? "Untitled"}
                style={{ height: 0, paddingTop: "56.25%" }}
              />
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default SavedNews;
