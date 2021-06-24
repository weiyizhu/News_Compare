import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Container,
  TextField,
  CardContent,
  Tabs,
  Tab,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Box,
} from "@material-ui/core";
import { FavoriteBorder, Search as SearchIcon } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import moment from "moment";

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;

const getEverything = () => {
  axios
    .post(url + "/news/everything", {
      params: {
        q: "keyword",
      },
    })
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.error(err.message);
    });
};

const getTopHeadlines = () => {
  axios
    .post(url + "/news/top-headlines", {
      params: {
        sources: "cnn, the-wall-street-journal, fox-news",
      },
    })
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.error(err.message);
    });
};

const getSources = () => {
  axios
    .post(url + "/news/sources", {
      params: {
        country: "us",
      },
    })
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.error(err.message);
    });
};

const Search: React.FC = () => {
  const [tabVal, setTabVal] = useState(0);
  const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(
    new Date()
  );
  const [selectedToDate, setSelectedToDate] = useState<Date | null>(new Date());

  const handleTabChange = (event: React.ChangeEvent<{}>, newVal: number) => {
    setTabVal(newVal);
  };

  const handleFromDateChange = (
    date: MaterialUiPickersDate,
    value?: string | null | undefined
  ) => {
    setSelectedFromDate(date);
  };

  const handleToDateChange = (
    date: MaterialUiPickersDate,
    value?: string | null | undefined
  ) => {
    setSelectedToDate(date);
  };

  return (
    // <div>
    //   <button onClick={getEverything}>get Everything</button>
    //   <button onClick={getTopHeadlines}>get Headlines</button>
    //   <button onClick={getSources}>get Headlines</button>
    // </div>
    <Container>
      <Box style={{ position: "relative" }}>
        <Card raised style={{ paddingBottom: "1em" }}>
          <Tabs
            value={tabVal}
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
                  <TextField
                    autoFocus
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    placeholder="Enter Search Keyword"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <FavoriteBorder />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {tabVal === 1 && (
                  <>
                    <Grid item xs={12} sm={3}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          autoOk
                          disableFuture
                          variant="inline"
                          format="MM/dd/yyyy"
                          label="from"
                          value={selectedFromDate}
                          onChange={handleFromDateChange}
                          minDate={moment().subtract(1, "month")}
                          inputVariant="outlined"
                          margin="normal"
                          style={{ width: "100%" }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          autoOk
                          disableFuture
                          variant="inline"
                          format="MM/dd/yyyy"
                          label="to"
                          value={selectedToDate}
                          onChange={handleToDateChange}
                          minDate={moment().subtract(1, "month")}
                          inputVariant="outlined"
                          margin="normal"
                          style={{ width: "100%" }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </>
                )}
              </Grid>
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
            style={{ borderRadius: "24px", backgroundColor: "#1a73e8", height: "40px" }}
          >
            Search
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default Search;
