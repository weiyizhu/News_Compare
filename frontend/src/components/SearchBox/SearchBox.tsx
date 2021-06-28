import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { FavoriteBorder, Search } from "@material-ui/icons";
import React from "react";
import { StateProps } from "../Search/Search";

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
  return (
    <TextField
      autoFocus
      margin="normal"
      variant="outlined"
      fullWidth
      placeholder="Enter Keyword"
      error={values.searchError}
      helperText={values.searchError && values.errorText}
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
            <IconButton>
              <FavoriteBorder />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={handleKeywordChange}
      value={values.keywords}
    />
  );
};

export default SearchBox;
