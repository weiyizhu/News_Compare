import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Menu,
  MenuItem,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import { sourceWithPage, StateProps } from "../Search/Search";
import React, { useState } from "react";
import { CheckBoxOutlineBlank, EventNoteRounded } from "@material-ui/icons";
import {
  allSources,
  leftSources,
  slightlyLeftSources,
  neutralSources,
  slightlyRightSources,
  rightSources,
} from "../../static/allSources";
import { Autocomplete } from "@material-ui/lab";
import { checkUtils } from "@material-ui/pickers/_shared/hooks/useUtils";

interface Props {
  values: StateProps;
  setValues: React.Dispatch<React.SetStateAction<StateProps>>;
}

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

const SourcesMenu: React.FC<Props> = ({ values, setValues }: Props) => {
  const handleClose = () => {
    setValues({ ...values, openMenu: false });
  };

  const handleCheckBoxClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void = (event, checked) => {
    if (checked)
      setValues({
        ...values,
        sourcesWithPage: [
          ...values.sourcesWithPage,
          { source: event.target.name, page: 1 },
        ],
      });
    else
      setValues({
        ...values,
        sourcesWithPage: values.sourcesWithPage.filter(
          (sourceWithPage) => sourceWithPage["source"] !== event.target.name
        ),
        // sourcesWithPage: [...values.sourcesWithPage].filter(
        //   (sourceWithPage) => sourceWithPage["source"] !== event.target.name
        // ),
      });
  };

  let defaultValues = [];
  for (let sourceWithPage of values.sourcesWithPage) {
    defaultValues.push(
      allSources.find((allSrc) => allSrc.id === sourceWithPage["source"])
    );
  }

  const [visibleSources, setVisibleSources] = useState<ISource[]>(leftSources);
  const [switchState, setSwitchState] = useState(false);

  return (
    // https://material-ui.com/components/autocomplete/#checkboxes
    <Dialog
      open={values.openMenu}
      onClose={() => {
        setValues({ ...values, openMenu: false });
      }}
    >
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
              error={values.sourcesWithPage.length > 3}
              helperText={
                values.sourcesWithPage.length > 3 &&
                "Sources cannot be more than three."
              }
            />
          )}
          defaultValue={defaultValues}
          limitTags={3}
          onChange={(event, selectedSourcesObj) => {
            console.log(event, selectedSourcesObj);
            let selectedSourcesArr: sourceWithPage[] = [];
            selectedSourcesObj.map((src) => {
              src && selectedSourcesArr.push({ source: src.id, page: 1 });
            });
            setValues({ ...values, sourcesWithPage: selectedSourcesArr });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setValues({ ...values, openMenu: false })}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setValues({ ...values, openMenu: false });
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>

    // <Menu
    //   open={values.openMenu}
    //   onClose={handleClose}
    //   style={{ maxHeight: 300, minWidth: 1000 }}
    // >
    //   {/* <Slider step={null} marks={marks} style={{ width: "80%", left: "10%" }} /> */}
    //   {allSources?.map((entry) => {
    //     return (
    //       <MenuItem key={entry.id}>
    //         <FormControlLabel
    //           control={
    //             <Checkbox
    //               name={entry.id}
    //               checked={values.sources.includes(entry.id)}
    //               onChange={handleCheckBoxClick}
    //             />
    //           }
    //           label={entry.name}
    //         />
    //       </MenuItem>
    //     );
    //   })}
    // </Menu>
    // <Dialog
    //   open={values.openMenu}
    //   onClose={() => {
    //     setValues({ ...values, openMenu: false });
    //   }}
    // >
    //   <DialogTitle>Sources</DialogTitle>
    //   <DialogContent>
    //     {/* {mock?.map((entry) => (
    //       <>
    //         <div>
    //           {entry.id} {entry.name}
    //         </div>
    //       </>
    //     ))} */}
    //     <Select>
    //       {mock?.map((entry) => (
    //         <MenuItem key={entry.id} value={entry.name}>
    //           <Checkbox />
    //           <ListItemText primary={entry.name}/>
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </DialogContent>
    //   <DialogActions>
    //     <Button
    //       onClick={() => setValues({ ...values, openMenu: false })}
    //       color="primary"
    //     >
    //       Cancel
    //     </Button>
    //     <Button
    //       onClick={() => {
    //         setValues({ ...values, openMenu: false });
    //       }}
    //       color="primary"
    //     >
    //       Save
    //     </Button>
    //   </DialogActions>
    // </Dialog>
  );
};

export default SourcesMenu;
