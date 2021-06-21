import React, {useState} from "react";
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
} from "@material-ui/core";
import {Search as SearchIcon} from '@material-ui/icons'

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
  const [tabVal, setTabVal] = useState(0)

  const handleTabChange = (event: React.ChangeEvent<{}>, newVal: number) => {
    setTabVal(newVal)
  };

  return (
    // <div>
    //   <button onClick={getEverything}>get Everything</button>
    //   <button onClick={getTopHeadlines}>get Headlines</button>
    //   <button onClick={getSources}>get Headlines</button>
    // </div>
    <Container>
      {/* <Paper elevation={3}>
          <TextField
            autoFocus
            label="search"
            margin="normal"
            variant="outlined"
          ></TextField>
      </Paper> */}
      <Paper square elevation={3}>
        <Tabs
          value={tabVal}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
        >
          <Tab label="Top Headlines" />
          <Tab label="Everything" />
        </Tabs>
      </Paper>
      <Card raised>
        <CardContent>
          <TextField
            autoFocus
            label="search"
            margin="normal"
            variant="outlined"
          ></TextField>
          <TextField
            autoFocus
            margin="normal"
            variant="outlined"
            type="date"
            label="from"
            InputLabelProps={{ shrink: true, focused: true }}
            disabled={tabVal === 0}
          ></TextField>
          <TextField
            autoFocus
            margin="normal"
            variant="outlined"
            type="date"
            label="to"
            InputLabelProps={{ shrink: true, focused: true }}
            disabled={tabVal === 0}
          ></TextField>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
          >Search</Button>
        </CardContent>
      </Card>
    </Container>
  );
};
export default Search;
