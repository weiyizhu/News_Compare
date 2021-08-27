import React from "react";
import {
  Card,
  Container,
  CardContent,
  Tabs,
  Tab,
  Button,
  Grid,
  Box,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import SourcesMenu from "../SourcesMenu";
import DatePicker from "../DatePicker";
import SearchBox from "../SearchBox";
import PickSources from "../PickSources";
import moment from "moment";
import { actionCreators } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import { SearchActionPayload } from "../../state/action-types/searchActionTypes";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const searchProps = useSelector<RootState, SearchActionPayload>(
    (state) => state.searchProps
  );
  const handleTabChange = (event: React.ChangeEvent<{}>, newVal: number) => {
    const resetSourcesWithPage = searchProps.sourcesWithPage.map(
      (sourceWithPage) => ({ source: sourceWithPage.source, page: 1 })
    );
    dispatch(actionCreators.toggleTabVal(newVal));
    dispatch(actionCreators.updateSourcesWithPage(resetSourcesWithPage));
  };

  const handleSearch = () => {
    if (searchProps.tabVal === 0) {
      dispatch(
        actionCreators.getTopHeadlines(
          searchProps.keywords,
          searchProps.sourcesWithPage
        )
      );
    } else {
      dispatch(
        actionCreators.getEverything(
          searchProps.keywords,
          moment(searchProps.fromDate).format("YYYY-MM-DD"),
          moment(searchProps.toDate).format("YYYY-MM-DD"),
          searchProps.sourcesWithPage,
          searchProps.filter
        )
      );
    }
  };

  return (
    <Container>
      <Box style={{ position: "relative", marginBottom: "3em" }}>
        <Card raised style={{ paddingBottom: "1em" }}>
          <Tabs
            value={searchProps.tabVal}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabChange}
          >
            <Tab label="Top Headlines" />
            <Tab label="Everything" />
          </Tabs>
          <Container>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm>
                  <SearchBox handleSearch={handleSearch} />
                </Grid>
                {searchProps.tabVal === 1 && (
                  <>
                    <Grid item xs={12} sm={3}>
                      <DatePicker label="from" />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <DatePicker label="to" />
                    </Grid>
                  </>
                )}
              </Grid>
              <PickSources />
            </CardContent>
          </Container>
        </Card>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: "-20px",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            style={{
              borderRadius: "24px",
              backgroundColor: "#1a73e8",
              height: "40px",
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
        <SourcesMenu />
      </Box>
    </Container>
  );
};
export default Search;
