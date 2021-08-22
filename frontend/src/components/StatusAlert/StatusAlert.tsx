import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../state";
import { Status } from "../../state/action-types/statusActionTypes";
import { RootState } from "../../state/reducers";

const StatusAlert = () => {
  const status = useSelector<RootState, Status>((state) => state.status.status);
  const error = status === Status.ERROR;
  const success = status === Status.SUCCESS;
  const msg = useSelector<RootState, string | null | undefined>(
    (state) => state.status.msg
  );

  const dispatch = useDispatch();

  const updateStatus = (status: Status) => {
    dispatch(actionCreators.updateStatus(status));
  };

  return (
    <Snackbar
      open={error || success}
      autoHideDuration={5000}
      onClose={() => updateStatus(Status.IDLE)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={() => updateStatus(Status.IDLE)}
        severity={error ? "error" : "success"}
      >
        {msg ? msg : error ? "error" : "success"}
      </Alert>
    </Snackbar>
  );
};

export default StatusAlert;
