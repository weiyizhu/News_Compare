import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import moment from "moment";
import React from "react";
import { StateProps } from "../Search/Search";

interface Props {
  values: StateProps;
  setValues: React.Dispatch<React.SetStateAction<StateProps>>;
  label: string;
}

const DatePicker: React.FC<Props> = ({
  values,
  setValues,
  label,
}: Props) => {
  const handleDateChange = (
    date: MaterialUiPickersDate,
    value?: string | null | undefined
  ) => {
    if (label === "from") setValues({ ...values, selectedFromDate: value });
    else setValues({ ...values, selectedToDate: value });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        autoOk
        disableFuture
        variant="inline"
        format="MM/dd/yyyy"
        label={label}
        value={
          label === "from" ? values.selectedFromDate : values.selectedFromDate
        }
        onChange={handleDateChange}
        minDate={moment().subtract(1, "month")}
        inputVariant="outlined"
        margin="normal"
        style={{ width: "100%" }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
