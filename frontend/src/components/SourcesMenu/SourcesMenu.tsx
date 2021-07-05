import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Menu,
  MenuItem,
  Slider,
  TextField,
} from "@material-ui/core";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import { StateProps } from "../Search/Search";
import React from "react";
import { CheckBoxOutlineBlank, EventNoteRounded } from "@material-ui/icons";
import { allSources } from "../../static/allSources";
import { Autocomplete } from "@material-ui/lab";
import { checkUtils } from "@material-ui/pickers/_shared/hooks/useUtils";

interface Props {
  values: StateProps;
  setValues: React.Dispatch<React.SetStateAction<StateProps>>;
}

const marks = [
  {
    value: 0,
    label: "Conservative",
  },
  {
    value: 50,
    label: "Moderate",
  },
  {
    value: 99,
    label: "Liberal",
  },
];

const SourcesMenu: React.FC<Props> = ({ values, setValues }: Props) => {
  const handleClose = () => {
    setValues({ ...values, openMenu: false });
  };

  const handleCheckBoxClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void = (event, checked) => {
    if (checked)
      setValues({ ...values, sources: [...values.sources, event.target.name] });
    else
      setValues({
        ...values,
        sources: [...values.sources].filter(
          (source) => source !== event.target.name
        ),
      });
  };

  let defaultValues = [];
  for (let src of values.sources) {
    defaultValues.push(allSources.find((allSrc) => allSrc.id === src));
  }

  return (
    // https://material-ui.com/components/autocomplete/#checkboxes
    <Dialog
      open={values.openMenu}
      onClose={() => {
        setValues({ ...values, openMenu: false });
      }}
    >
      <DialogTitle>SOURCES</DialogTitle>
      <DialogContent>
        <Slider
          step={null}
          marks={marks}
          style={{ width: "80%", left: "10%" }}
        />
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={allSources}
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
          style={{ minWidth:"275px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Sources"
              error={values.sources.length > 3}
              helperText={
                values.sources.length > 3 &&
                "Sources cannot be more than three."
              }
            />
          )}
          defaultValue={defaultValues}
          limitTags={3}
          onChange={(event, selectedSourcesObj) => {
            console.log(event, selectedSourcesObj);
            let selectedSourcesArr: string[] = [];
            selectedSourcesObj.map((src) => {
              src && selectedSourcesArr.push(src.id);
            });
            setValues({ ...values, sources: selectedSourcesArr });
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
