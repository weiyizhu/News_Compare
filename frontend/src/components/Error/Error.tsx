import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react'
import { StatesProps } from '../Search/Search'

const Error: React.FC<StatesProps> = ({values, setValues}: StatesProps) => {
    return (
      <Snackbar
        open={values.searchError}
        autoHideDuration={6000}
        onClose={() => setValues({ ...values, searchError: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setValues({ ...values, searchError: false })}
          severity="error"
        >
          {values.errorText}
        </Alert>
      </Snackbar>
    );
}

export default Error