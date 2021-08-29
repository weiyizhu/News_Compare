import { Button, Chip, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../state";
import { RootState } from "../../state/reducers";
import { allSources } from "../../static/allSources";
import { NewsResponseProps, sourceWithPage } from "../../types";

const PickSources = () => {
  const news = useSelector<RootState, NewsResponseProps[] | null | undefined>(
    (state) => state.news["posts"]
  );
  const sourcesWithPage = useSelector<RootState, sourceWithPage[]>(
    (state) => state.searchProps.sourcesWithPage
  );

  const dispatch = useDispatch();

  const handleSourcesDelete = (sourceToBeDeleted: string) => () => {
    dispatch(
      actionCreators.updateSourcesWithPage(
        sourcesWithPage.filter(
          (sourceWithPage) => sourceWithPage["source"] !== sourceToBeDeleted
        )
      )
    );
    dispatch(
      actionCreators.updateNews(
        news?.filter((newsEntry) => {
          return newsEntry.articles.length > 0
            ? newsEntry.articles[0].source
              ? newsEntry.articles[0].source.id !== sourceToBeDeleted
              : false
            : false;
        })
      )
    );
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Button
          onClick={() => {
            dispatch(actionCreators.toggleOpenMenu(true));
          }}
        >
          Sources:{" "}
        </Button>
      </Grid>
      {sourcesWithPage &&
        sourcesWithPage.map((sourceWithPage) => {
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
