import { Button, Chip, Grid } from "@material-ui/core";
import React from "react";
import { allSources } from "../../static/allSources";
import { StateProps } from "../Search/Search";

interface Props {
  values: StateProps;
  setValues: React.Dispatch<React.SetStateAction<StateProps>>;
}

const PickSources: React.FC<Props> = ({ values, setValues }: Props) => {
  const handleSourcesDelete = (sourceToDeleted: string) => () => {
    setValues({
      ...values,
      sourcesWithPage: values.sourcesWithPage.filter(
        (source) => source["source"] !== sourceToDeleted
      ),
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
      {values.sourcesWithPage &&
        values.sourcesWithPage.map((sourceWithPage) => {
          const source = sourceWithPage["source"];
          return (
            <Grid item key={source}>
              <Chip
                label={
                  allSources.filter((newsSource) => newsSource.id === source)[0]
                    .name
                }
                onDelete={handleSourcesDelete(source)}
              ></Chip>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default PickSources;
