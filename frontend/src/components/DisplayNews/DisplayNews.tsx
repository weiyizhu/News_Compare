import { Container, Grid, Typography } from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import React from "react";
import { getTopHeadlines, NewsResponseProps } from "../../api/news";
import NewsEntry from "../NewsEntry";
import { sourceWithPage, StatesProps } from "../Search/Search";

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

const DisplayNews: React.FC<StatesProps> = ({
  values,
  setValues,
}: StatesProps) => {
  return (
    <Container style={{ marginTop: "30px" }}>
      <Grid container spacing={2}>
        {values.news &&
          values.news.map((newsSrc, index) => (
            <Grid item xs={12} sm>
              {newsSrc.totalResults > 0 ? (
                <>
                  {newsSrc.articles.map((story) => (
                    <NewsEntry {...story} />
                  ))}

                  <Pagination
                    color="primary"
                    count={Math.ceil(newsSrc.totalResults / 3)}
                    getItemAriaLabel={() =>
                      values.sourcesWithPage[index].source
                    }
                    onChange={(event, page) => {
                      const target = event.target as HTMLInputElement;
                      const sourceId = target.getAttribute("aria-label");
                      let newSourcesWithPage: sourceWithPage[] = [];
                      for (let sourceWithPage of values.sourcesWithPage) {
                        console.log(sourceWithPage.source, sourceId);
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
                      // getTopHeadlines(
                      //   values.keywords,
                      //   newSourcesWithPage,
                      //   values,
                      //   setValues
                      // );
                    }}
                  />
                </>
              ) : (
                <Typography>lol</Typography>
              )}
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default DisplayNews;
