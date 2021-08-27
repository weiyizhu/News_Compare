import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Favorite, FavoriteBorder, Search } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators } from "../../state";
import { Status } from "../../state/action-types/statusActionTypes";
import { savedSearches } from "../../state/action-types/userActionTypes";
import { RootState } from "../../state/reducers";

interface Props {
  handleSearch: () => void;
}

const SearchBox: React.FC<Props> = ({ handleSearch }: Props) => {
  const keywords = useSelector<RootState, string>(
    (state) => state.searchProps.keywords
  );
  const sourcesWithPage = useSelector<RootState, sourceWithPage[]>(
    (state) => state.searchProps.sourcesWithPage
  );
  const savedSearches = useSelector<RootState, savedSearches[] | undefined>(
    (state) => state.user.savedSearches
  );
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.user.isLoggedIn
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSavedSearch = () => {
    if (!isLoggedIn) {
      dispatch(
        actionCreators.updateStatus(Status.ERROR, "You have to log in first")
      );
      history.push("/login");
      return;
    }
    let errorMsg = "";
    if (keywords === "") {
      errorMsg = "keywords cannot be empty";
    } else if (sourcesWithPage.length === 0) {
      errorMsg = "sources cannot be empty";
    } else if (sourcesWithPage.length > 3) {
      errorMsg = "sources cannot be more than 3";
    }
    if (errorMsg) {
      dispatch(actionCreators.updateStatus(Status.ERROR, errorMsg));
    } else {
      const sources = sourcesWithPage.map(
        (sourceWithPage) => sourceWithPage.source
      );
      if (!clicked) {
        dispatch(
          actionCreators.addSavedSearches(keywords, sources, savedSearches)
        );
      } else {
        dispatch(
          actionCreators.deleteSavedSearches(keywords, sources, savedSearches)
        );
      }
      setClicked(!clicked);
    }
  };

  const handleKeywordChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = (event) => {
    dispatch(actionCreators.updateKeywords(event.target.value));
  };
  const [clicked, setClicked] = useState(false);
  return (
    <TextField
      autoFocus
      margin="normal"
      variant="outlined"
      fullWidth
      placeholder="Enter Keyword"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Save" arrow>
              <IconButton onClick={handleSavedSearch}>
                {clicked ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      onChange={handleKeywordChange}
      onKeyPress={(event) => {
        if (event.key === "Enter") handleSearch();
      }}
      value={keywords}
    />
  );
};

export default SearchBox;
