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
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import SourcesMenu from "../SourcesMenu";
import { getEverything, getTopHeadlines, Sources } from "../../api/news";
import DatePicker from "../DatePicker";
import SearchBox from "../SearchBox";
import PickSources from "../PickSources";

export interface StateProps {
  keywords: string;
  tabVal: number;
  selectedFromDate: ParsableDate;
  selectedToDate: ParsableDate;
  sources: string[];
  openMenu: boolean;
  searchError: boolean;
  errorText: string;
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
  });

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
      if (values.tabVal === 0)
        getTopHeadlines(values.keywords, values.sources.join());
      else if (values.tabVal === 1) {
        getEverything(
          values.keywords,
          values.selectedFromDate,
          values.selectedToDate,
          values.sources.join()
        );
      }
    };

  return (
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
    </Container>
  );
};
export default Search;
