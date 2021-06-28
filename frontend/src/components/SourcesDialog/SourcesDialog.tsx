import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import { StateProps } from "../Search/Search";
import React from "react";

interface Props {
  values: StateProps;
  setValues: React.Dispatch<React.SetStateAction<StateProps>>;
}

const SourcesDialog: React.FC<Props> = ({ values, setValues }: Props) => {
  return (
    <Dialog
      open={values.openDialogue}
      onClose={() => {
        setValues({ ...values, openDialogue: false });
      }}
    >
      <DialogTitle>Sources</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button
          onClick={() => setValues({ ...values, openDialogue: false })}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setValues({ ...values, openDialogue: false });
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SourcesDialog;
