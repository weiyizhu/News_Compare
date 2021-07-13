import {
  Container,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import { Pagination, PaginationItem } from "@material-ui/lab";
import React, { useState } from "react";
import { getTopHeadlines, NewsResponseProps } from "../../api/news";
import { allSources } from "../../static/allSources";
import NewsEntry from "../NewsEntry";
import { Filters, sourceWithPage, StatesProps } from "../Search/Search";

const mock = {
  description:
    "CNN's Maggie Haberman breaks down comments made by former President Trump during a rally in Florida in which he appears to admit facts of a case against his company, The Trump Organization and its CFO, Allen Weisselberg.",
  publishedAt: "2021-07-05T18:07:42.8940152Z",
  source: { id: "cnn", name: "CNN" },
  title: "Haberman calls Trump's rally remarks 'risky gamble' - CNN Video",
  url: "http://us.cnn.com/videos/politics/2021/07/05/donald-trump-sarasota-florida-rally-trump-org-weisselberg-haberman-newday-vpx.cnn",
  urlToImage:
    "https://cdn.cnn.com/cnnnext/dam/assets/210705082435-maggie-haberman-donald-trump-split-super-tease.jpg",
};

const useStyles = makeStyles({
  center: {
    justifyContent: "center",
  },
});

const DisplayNews: React.FC<StatesProps> = ({
  values,
  setValues,
}: StatesProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const filterOptions = ["publishedAt", "popularity", "relavency"];
  return (
    <Container>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="h4" paragraph>
            {values.tabVal == 0 ? "Top Headlines" : "Everything"}
          </Typography>
        </Grid>
        {values.tabVal == 1 && (
          <>
            <Grid item><Typography>Sort by</Typography></Grid>
            <Grid item>
              <IconButton
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}
              >
                <FilterList />
              </IconButton>
              <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                  setAnchorEl(null);
                }}
                // keepMounted`
              >
                {filterOptions.map((option) => (
                  <MenuItem
                    key={option}
                    aria-label={option}
                    selected={option === values.filter}
                    onClick={(event) => {
                      const target = event.target as Element;
                      const filterString = target.getAttribute("aria-label");
                      const filterEnum = filterString
                        ? (filterString as Filters)
                        : Filters.publishedAt;
                      setValues({ ...values, filter: filterEnum });
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </>
        )}
      </Grid>
      <Divider style={{ marginBottom: "2em" }} />
      <Grid container spacing={2}>
        {values.news &&
          values.news.map((newsSrc, index) => (
            <Grid item xs={12} sm>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                {
                  allSources.filter(
                    (newsSource) =>
                      newsSource.id === values.sourcesWithPage[index].source
                  )[0].name
                }
              </Typography>
              {newsSrc.totalResults ? (
                <>
                  {newsSrc.articles.map((story) => (
                    <NewsEntry {...story} />
                  ))}

                  <Pagination
                    color="primary"
                    style={{ paddingTop: "1em", paddingBottom: "1em" }}
                    classes={{ ul: classes.center }}
                    count={Math.ceil(newsSrc.totalResults / 3)}
                    getItemAriaLabel={() =>
                      values.sourcesWithPage[index].source
                    }
                    onChange={(event, page) => {
                      const target = event.target as HTMLInputElement;
                      const sourceId = target.getAttribute("aria-label");
                      let newSourcesWithPage: sourceWithPage[] = [];
                      for (let sourceWithPage of values.sourcesWithPage) {
                        if (sourceWithPage.source === sourceId)
                          newSourcesWithPage.push({
                            source: sourceId,
                            page: page,
                          });
                        else newSourcesWithPage.push(sourceWithPage);
                      }
                      setValues({
                        ...values,
                        sourcesWithPage: newSourcesWithPage,
                      });
                    }}
                  />
                </>
              ) : (
                <Typography>No News Available</Typography>
              )}
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default DisplayNews;
