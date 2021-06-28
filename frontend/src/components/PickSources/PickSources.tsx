import { Button, Chip, Grid } from "@material-ui/core";
import React from "react";
import { StateProps } from "../Search/Search";

interface Props {
  values: StateProps;
  setValues: React.Dispatch<React.SetStateAction<StateProps>>;
}

const PickSources: React.FC<Props> = ({ values, setValues }: Props) => {
  const handleSourcesDelete = (sourceToDeleted: string) => () => {
    setValues({
      ...values,
      sources: values.sources.filter((source) => source !== sourceToDeleted),
    });
  };
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Button
          onClick={() => {
            setValues({ ...values, openMenu: true });
          }}
        >
          Sources:{" "}
        </Button>
      </Grid>
      {values.sources &&
        values.sources.map((source) => {
          return (
            <Grid item key={source}>
              <Chip
                label={source}
                onDelete={handleSourcesDelete(source)}
              ></Chip>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default PickSources;
