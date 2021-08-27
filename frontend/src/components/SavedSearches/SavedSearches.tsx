import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Close, SearchOutlined } from "@material-ui/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators } from "../../state";
import { Filters } from "../../state/action-types/searchActionTypes";
import { savedSearches } from "../../state/action-types/userActionTypes";
import { RootState } from "../../state/reducers";
import { allSources } from "../../static/allSources";

const SavedSearches = () => {
  const savedSearches = useSelector<RootState, savedSearches[] | undefined>(
    (state) => state.user.savedSearches
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSavedSearch = (keywords: string, sources: string[]) => {
    dispatch(
      actionCreators.deleteSavedSearches(keywords, sources, savedSearches)
    );
  };
  const handleSearch = (keywords: string, sources: string[]) => {
    dispatch(actionCreators.updateKeywords(keywords));

    const sourcesWithPage: sourceWithPage[] = sources.map((source) => ({
      source,
      page: 1,
    }));
    dispatch(actionCreators.updateSourcesWithPage(sourcesWithPage));
    dispatch(actionCreators.updateFromDate(new Date()));
    dispatch(actionCreators.updateToDate(new Date()));
    dispatch(actionCreators.updateFilter(Filters.publishedAt));
    dispatch(actionCreators.toggleTabVal(1));
    dispatch(
      actionCreators.getEverything(
        keywords,
        moment(new Date()).format("YYYY-MM-DD"),
        moment(new Date()).format("YYYY-MM-DD"),
        sourcesWithPage,
        Filters.publishedAt
      )
    );
    history.push("/");
  };
  return (
    <Grid container spacing={3}>
      {savedSearches &&
        savedSearches.map((savedSearch) => (
          <Grid item xs={12} md={6}>
            <Card raised>
              <CardHeader
                title={savedSearch.keywords}
                action={
                  <>
                    <Tooltip title="Search" arrow>
                      <IconButton
                        onClick={() =>
                          handleSearch(
                            savedSearch.keywords,
                            savedSearch.sources
                          )
                        }
                      >
                        <SearchOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        onClick={() =>
                          handleSavedSearch(
                            savedSearch.keywords,
                            savedSearch.sources
                          )
                        }
                      >
                        <Close />
                      </IconButton>
                    </Tooltip>
                  </>
                }
                style={{ paddingBottom: 0 }}
              />
              <CardContent style={{ paddingTop: 0, paddingBottom: "1em" }}>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item xs>
                    <Typography variant="body2" color="textSecondary">
                      {savedSearch.sources
                        .map(
                          (source) =>
                            allSources.filter(
                              (newsSource) => newsSource.id === source
                            )[0].name
                        )
                        .join(", ")}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default SavedSearches;
