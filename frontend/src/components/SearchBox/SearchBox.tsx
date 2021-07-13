import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Favorite, FavoriteBorder, Search } from "@material-ui/icons";
import React, { useState } from "react";
import { search, StateProps } from "../Search/Search";

interface Props {
  values: StateProps;
  setValues: React.Dispatch<React.SetStateAction<StateProps>>;
}

const SearchBox: React.FC<Props> = ({ values, setValues }: Props) => {
  const handleKeywordChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = (event) => {
    setValues({ ...values, keywords: event.target.value });
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
              <IconButton onClick={() => setClicked(!clicked)}>
                {clicked ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      onChange={handleKeywordChange}
      onKeyPress={(event) => {
        if (event.key === "Enter") search(values, setValues);
      }}
      value={values.keywords}
    />
  );
};

export default SearchBox;
