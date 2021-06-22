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
} from "@material-ui/core";
import {Search as SearchIcon} from '@material-ui/icons'
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
      <Card raised>
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
                <TextField
                  autoFocus
                  label="search"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                ></TextField>
              </Grid>
              {tabVal === 1 && (
                <>
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
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </CardContent>
        </Container>
      </Card>
    </Container>
  );
};
export default Search;
