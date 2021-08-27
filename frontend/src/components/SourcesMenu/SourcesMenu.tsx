import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import {
  allSources,
  leftSources,
  slightlyLeftSources,
  neutralSources,
  slightlyRightSources,
  rightSources,
} from "../../static/allSources";
import { Autocomplete } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import { actionCreators } from "../../state";

const marks = [
  {
    value: 0,
    label: "Left",
  },
  {
    value: 25,
    label: "Slightly Left",
  },
  {
    value: 50,
    label: "Neutral",
  },
  {
    value: 75,
    label: "Slightly Right",
  },
  {
    value: 99,
    label: "Right",
  },
];

export interface ISource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
  bias: number;
}

const SourcesMenu = () => {
  const sourcesWithPage = useSelector<RootState, sourceWithPage[]>(
    (state) => state.searchProps.sourcesWithPage
  );
  const openMenu = useSelector<RootState, boolean>(
    (state) => state.searchProps.openMenu
  );

  const dispatch = useDispatch();

  const closeMenu = () => {
    dispatch(actionCreators.toggleOpenMenu(false));
  };

  let defaultValues = [];
  for (let sourceWithPage of sourcesWithPage) {
    defaultValues.push(
      allSources.find((allSrc) => allSrc.id === sourceWithPage["source"])
    );
  }

  const [visibleSources, setVisibleSources] = useState<ISource[]>(leftSources);
  const [switchState, setSwitchState] = useState(false);

  return (
    // https://material-ui.com/components/autocomplete/#checkboxes
    <Dialog open={openMenu} onClose={closeMenu}>
      <DialogTitle>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="h6">SOURCES</Typography>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={switchState}
                  onChange={(event) => {
                    setSwitchState(event.target.checked);
                    if (!event.target.checked) setVisibleSources(leftSources);
                  }}
                />
              }
              label="Show bias spectrum"
            />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {switchState && (
          <Slider
            step={null}
            marks={marks}
            onChange={(event, value) => {
              switch (value) {
                case 0:
                  setVisibleSources(leftSources);
                  break;
                case 25:
                  setVisibleSources(slightlyLeftSources);
                  break;
                case 50:
                  setVisibleSources(neutralSources);
                  break;
                case 75:
                  setVisibleSources(slightlyRightSources);
                  break;
                case 99:
                  setVisibleSources(rightSources);
                  break;
                default:
                  setVisibleSources(allSources);
              }
            }}
            style={{ width: "80%", left: "10%", marginBottom: "2.5em" }}
            defaultValue={0}
          />
        )}

        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={switchState ? visibleSources : allSources} //
          disableCloseOnSelect
          getOptionLabel={(options) => (options ? options.name : "None")}
          renderOption={(option, { inputValue, selected }) => {
            return (
              option && (
                <>
                  <Checkbox checked={selected} style={{ marginRight: 8 }} />{" "}
                  {option.name}
                </>
              )
            );
          }}
          style={{ minWidth: "400px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Sources"
              error={sourcesWithPage.length > 3}
              helperText={
                sourcesWithPage.length > 3 &&
                "Sources cannot be more than three."
              }
            />
          )}
          defaultValue={defaultValues}
          limitTags={3}
          onChange={(event, selectedSourcesObj) => {
            let selectedSourcesArr: sourceWithPage[] = [];
            selectedSourcesObj.forEach((src) => {
              src && selectedSourcesArr.push({ source: src.id, page: 1 });
            });
            dispatch(actionCreators.updateSourcesWithPage(selectedSourcesArr));
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeMenu} color="primary">
          Cancel
        </Button>
        <Button onClick={closeMenu} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SourcesMenu;
