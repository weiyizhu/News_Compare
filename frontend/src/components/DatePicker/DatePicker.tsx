import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../state";
import { RootState } from "../../state/reducers";

interface Props {
  label: string
}

const DatePicker: React.FC<Props> = ({ label }: Props) => {
  const dispatch = useDispatch();

  const fromDate = useSelector<RootState, ParsableDate>(
    (state) => state.searchProps.fromDate
  );
  const toDate = useSelector<RootState, ParsableDate>(
    (state) => state.searchProps.toDate
  );

  const handleDateChange = (
    date: MaterialUiPickersDate,
    value?: string | null | undefined
  ) => {
    if (label === "from") {
      dispatch(actionCreators.updateFromDate(value));
    } else {
      dispatch(actionCreators.updateToDate(value));
    }
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
        value={label === "from" ? fromDate : toDate}
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
