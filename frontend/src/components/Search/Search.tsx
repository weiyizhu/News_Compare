import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  CardContent,
  Tabs,
  Tab,
  Button,
  Grid,
  Box,
  Snackbar,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import SourcesMenu from "../SourcesMenu";
import { getEverything, getTopHeadlines, NewsResponseProps, Sources } from "../../api/news";
import DatePicker from "../DatePicker";
import SearchBox from "../SearchBox";
import PickSources from "../PickSources";
import moment from "moment";
import { Alert } from "@material-ui/lab";
import DisplayNews from "../DisplayNews";

export interface StateProps {
  keywords: string;
  tabVal: number;
  selectedFromDate: ParsableDate;
  selectedToDate: ParsableDate;
  sources: string[];
  openMenu: boolean;
  searchError: boolean;
  errorText: string;
  news: NewsResponseProps[] | null
}

export interface StatesProps {
  values: StateProps;
  setValues: React.Dispatch<React.SetStateAction<StateProps>>;
}

const Search: React.FC = () => {
  const [values, setValues] = useState<StateProps>({
    keywords: "",
    tabVal: 0,
    selectedFromDate: new Date(),
    selectedToDate: new Date(),
    sources: ["cnn", "the-wall-street-journal", "fox-news"],
    openMenu: false,
    searchError: false,
    errorText: "",
    news: null
  });

  useEffect(() => {
    getTopHeadlines(values.keywords, values.sources.join(), values, setValues);
  }, []);

  const handleTabChange = (event: React.ChangeEvent<{}>, newVal: number) => {
    setValues({ ...values, tabVal: newVal });
  };

  const handleSearch: React.MouseEventHandler<HTMLButtonElement> | undefined =
    () => {
      if (values.sources.length > 3) {
        setValues({
          ...values,
          searchError: true,
          errorText: "Sources cannot be more than three.",
        });
        return;
      }
      if (values.sources.length === 0 && values.keywords === "") {
        setValues({
          ...values,
          searchError: true,
          errorText:
            "The scope of your search is too broad. Please enter keywords or select sources and try again.",
        });
        return;
      }
      if (values.tabVal === 0)
        getTopHeadlines(values.keywords, values.sources.join(), values, setValues);
      else if (values.tabVal === 1) {
        getEverything(
          values.keywords,
          moment(values.selectedFromDate).format("YYYY-MM-DD"),
          moment(values.selectedToDate).format("YYYY-MM-DD"),
          values.sources.join(),
          values,
          setValues
        );
      }
    };

  return (
    <>
      <Container>
        <Box style={{ position: "relative" }}>
          <Card raised style={{ paddingBottom: "1em" }}>
            <Tabs
              value={values.tabVal}
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
                    <SearchBox values={values} setValues={setValues} />
                  </Grid>
                  {values.tabVal === 1 && (
                    <>
                      <Grid item xs={12} sm={3}>
                        <DatePicker
                          values={values}
                          setValues={setValues}
                          label="from"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <DatePicker
                          values={values}
                          setValues={setValues}
                          label="to"
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
                <PickSources values={values} setValues={setValues} />
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
          <SourcesMenu values={values} setValues={setValues} />
        </Box>
        <Snackbar
          open={values.searchError}
          autoHideDuration={6000}
          onClose={() => setValues({ ...values, searchError: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setValues({ ...values, searchError: false })}
            severity="error"
          >
            {values.errorText}
          </Alert>
        </Snackbar>
      </Container>
      <DisplayNews values={values} setValues={setValues} />
    </>
  );
};
export default Search;
