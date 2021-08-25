import { Container, Grid, Typography } from "@material-ui/core";

const notFound = () => {
  return (
    <Container style={{ width: "50vw", marginTop: "4em" }}>
      <Grid
        container
        direction="column"
        justify="center"
        alignContent="center"
        spacing={3}
        style={{ top: "50%" }}
      >
        <Grid item>
          <Typography
            variant="h4"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            Sorry, page not found!
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h5"
            color="textSecondary"
            style={{ textAlign: "center" }}
          >
            Sorry, we couldn’t find the page you’re looking for. Be sure to
            check your spelling.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default notFound;
