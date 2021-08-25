import { Card, CardHeader, Grid, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const sources = "CNN, The Wall Street Journal, Fox News";
const date = "9/2/2021";

const SavedSearches = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader
            title="search"
            subheader={`${sources}`}
            action={
              <IconButton>
                <Close />
              </IconButton>
            }
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default SavedSearches;
