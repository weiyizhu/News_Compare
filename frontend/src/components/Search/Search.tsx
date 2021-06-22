import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Container,
  TextField,
  CardContent,
  Paper,
  Collapse,
  Tabs,
  Tab,
  Button,
  Grid,
  Divider,
  InputBase,
  IconButton,
  InputAdornment,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { FavoriteBorder, Search as SearchIcon, Visibility } from "@material-ui/icons";
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
      <Card raised style={{ position: "relative" }}>
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
            <Grid container spacing={2}>
              <Grid item style={{ flexGrow: 1 }}>
                <FormControl variant="outlined">
                  <InputLabel>Search</InputLabel>
                  <OutlinedInput
                    // startAdornment={
                    //   <InputAdornment position="start">
                    //     <SearchIcon />
                    //   </InputAdornment>
                    // }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton>
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    }
                  ></OutlinedInput>
                </FormControl>
                {/* <TextField
                  autoFocus
                  label="search"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <FavoriteBorder />
                      </InputAdornment>
                    ),
                  }}
                /> */}
              </Grid>
              {tabVal === 1 && (
                <>
                  {/* <Grid item>
                    <Divider orientation="vertical" />
                  </Grid> */}
                  <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        autoOk
                        disableFuture
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="from"
                        value={selectedFromDate}
                        onChange={handleFromDateChange}
                        minDate={moment().subtract(1, "month")}
                        inputVariant="outlined"
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        autoOk
                        disableFuture
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="to"
                        value={selectedToDate}
                        onChange={handleToDateChange}
                        minDate={moment().subtract(1, "month")}
                        inputVariant="outlined"
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </>
              )}
            </Grid>
          </CardContent>
        </Container>
        <Box
          style={{ display: "flex", justifyContent: "center", zIndex: 10000 }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      </Card>
    </Container>
  );
};
export default Search;
