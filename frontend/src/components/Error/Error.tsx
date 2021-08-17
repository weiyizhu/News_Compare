import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../state";
import { NewsStatus } from "../../state/action-types/newsActionTypes";
import { RootState } from "../../state/reducers";

const Error = () => {
  const status = useSelector<RootState, NewsStatus>(
    (state) => state.news.status
  );
  const hasError = status === NewsStatus.ERROR;
  const errorMsg = useSelector<RootState, string | null | undefined>(
    (state) => state.news.errorMsg
  );

  const dispatch = useDispatch();

  const updateStatus = (status: NewsStatus) => {
    dispatch(actionCreators.updateStatus(status));
  };

  return (
    <Snackbar
      open={hasError}
      autoHideDuration={6000}
      onClose={() => updateStatus(NewsStatus.IDLE)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={() => updateStatus(NewsStatus.IDLE)} severity="error">
        {errorMsg}
      </Alert>
    </Snackbar>
  );
};

export default Error;
