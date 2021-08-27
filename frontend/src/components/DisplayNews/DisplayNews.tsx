import {
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../state";
import { NewsActionPayload } from "../../state/action-types/newsActionTypes";
import {
  Filters,
  SearchActionPayload,
} from "../../state/action-types/searchActionTypes";
import { Status } from "../../state/action-types/statusActionTypes";
import { RootState } from "../../state/reducers";
import { allSources } from "../../static/allSources";
import NewsEntry from "../NewsEntry";

const useStyles = makeStyles({
  center: {
    justifyContent: "center",
  },
});

const DisplayNews = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const searchProps = useSelector<RootState, SearchActionPayload>(
    (state) => state.searchProps
  );
  const { sourcesWithPage, tabVal, filter, keywords, fromDate, toDate } =
    searchProps;

  const dispatch = useDispatch();

  useEffect(() => {
    if (tabVal === 0) {
      dispatch(actionCreators.getTopHeadlines(keywords, sourcesWithPage));
    } else {
      dispatch(
        actionCreators.getEverything(
          keywords,
          moment(fromDate).format("YYYY-MM-DD"),
          moment(toDate).format("YYYY-MM-DD"),
          sourcesWithPage,
          filter
        )
      );
    }
  }, [dispatch, sourcesWithPage]);

  const handleFilterChange = (newFilter: Filters) => {
    const resetSourcesWithPage = searchProps.sourcesWithPage.map(
      (sourceWithPage) => ({ source: sourceWithPage.source, page: 1 })
    );
    dispatch(actionCreators.updateFilter(newFilter));
    dispatch(actionCreators.updateSourcesWithPage(resetSourcesWithPage));
    dispatch(
      actionCreators.getEverything(
        keywords,
        moment(fromDate).format("YYYY-MM-DD"),
        moment(toDate).format("YYYY-MM-DD"),
        resetSourcesWithPage,
        newFilter
      )
    );
  };

  const news = useSelector<RootState, NewsActionPayload>((state) => state.news);
  const loading = useSelector<RootState, boolean>(
    (state) => state.status.status === Status.LOADING
  );

  return (
    <Container>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="h4" paragraph>
            {tabVal === 0 ? "Top Headlines" : "Everything"}
          </Typography>
        </Grid>
        {tabVal === 1 && (
          <>
            <Grid item>
              <Typography>Sort by</Typography>
            </Grid>
            <Grid item>
              <IconButton
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}
              >
                <FilterList />
              </IconButton>
              <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                  setAnchorEl(null);
                }}
              >
                {Object.values(Filters).map((option) => (
                  <MenuItem
                    key={option}
                    aria-label={option}
                    selected={option === filter}
                    onClick={(event) => {
                      const target = event.target as Element;
                      const filterString = target.getAttribute("aria-label");
                      const filterEnum = filterString
                        ? (filterString as Filters)
                        : Filters.publishedAt;

                      handleFilterChange(filterEnum);
                      setAnchorEl(null);
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </>
        )}
      </Grid>
      <Divider style={{ marginBottom: "2em" }} />
      {loading ? (
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {news.posts &&
            news.posts.map((newsSrc, index) => (
              <Grid item xs={12} sm>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  {
                    allSources.filter(
                      (newsSource) =>
                        newsSource.id === sourcesWithPage[index].source
                    )[0].name
                  }
                </Typography>
                {newsSrc.totalResults && newsSrc.articles ? (
                  <>
                    {newsSrc.articles.map((story) => (
                      <NewsEntry {...story} />
                    ))}

                    <Pagination
                      color="primary"
                      style={{ paddingTop: "1em", paddingBottom: "1em" }}
                      classes={{ ul: classes.center }}
                      count={Math.min(33, Math.ceil(newsSrc.totalResults / 3))}
                      getItemAriaLabel={() => sourcesWithPage[index].source}
                      boundaryCount={2}
                      page={sourcesWithPage[index].page}
                      onChange={(event, page) => {
                        const sourceId = newsSrc.articles
                          ? newsSrc.articles[0].source
                            ? newsSrc.articles[0].source?.id
                            : undefined
                          : undefined;
                        let newSourcesWithPage: sourceWithPage[] = [];
                        for (let sourceWithPage of sourcesWithPage) {
                          if (sourceWithPage.source === sourceId)
                            newSourcesWithPage.push({
                              source: sourceId,
                              page: page,
                            });
                          else newSourcesWithPage.push(sourceWithPage);
                        }
                        dispatch(
                          actionCreators.updateSourcesWithPage(
                            newSourcesWithPage
                          )
                        );
                      }}
                    />
                  </>
                ) : (
                  <Typography style={{ marginTop: "1em", textAlign: "center" }}>
                    No News Available
                  </Typography>
                )}
              </Grid>
            ))}
        </Grid>
      )}
    </Container>
  );
};

export default DisplayNews;
