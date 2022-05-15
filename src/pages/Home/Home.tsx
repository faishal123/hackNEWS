import React, { useEffect, useState } from "react";
import { useFetchTopStories, useGetAllTitles } from "./function";
import {
  SingleItem,
  Button,
  BackgroundWrapper,
  Input,
  Text,
  Loading,
  LoaderCircle,
  Notification,
} from "src/components";
import css from "./Home.module.css";

const Component = () => {
  const [renderNotification, setRenderNotification] = useState({ message: "" });
  const {
    data,
    loading,
    onNextPage,
    onPrevPage,
    search,
    urlSearch,
    setSearch,
  } = useFetchTopStories({
    onError: (e) => setRenderNotification({ message: e }),
  });

  const { progress } = useGetAllTitles({
    onError: (e) => setRenderNotification({ message: e }),
  });
  const fetchAllComplete = progress === 100;

  return (
    <>
      {!!renderNotification && (
        <Notification
          id="notification"
          message={renderNotification?.message}
          onClose={() => {
            setRenderNotification({ message: "" });
          }}
        />
      )}
      {loading ? <Loading /> : null}
      <BackgroundWrapper>
        <div className={css.homeContainer}>
          <div className={`margin--xlarge-b ${css.logoContainer}`}>
            <Text id="txt-logo1" variant="light" size="xxxxxlarge">
              hack
            </Text>
            <Text
              id="txt-logo2"
              size="xxxxxlarge"
              variant="black"
              color="orange"
            >
              NEWS
            </Text>
          </div>
          <div className={`margin--xlarge-b ${css.inputAndProgressContainer}`}>
            <Input
              id="txt-search"
              placeholder="Search News Here"
              onChange={(e) => {
                setSearch(e?.target?.value);
              }}
              value={search}
            />
            {fetchAllComplete ? null : (
              <div className={css.getAllProgress}>
                <LoaderCircle id="loaderProgress" size="xsmall" />
                <Text id="txt-fetch-search-data" size="small">
                  Fetching Search Data ({`${progress}`}%)
                </Text>
              </div>
            )}
          </div>
          {data?.length > 0 ? (
            data.map((d) => {
              return <SingleItem key={d?.id} d={d} />;
            })
          ) : (
            <div>
              <Text id="txt-story-not-found" size="xxlarge" variant="thin">
                Story Not Found
              </Text>
            </div>
          )}
          {!urlSearch && (
            <div className={css.buttonContainer}>
              <div>
                <Button id="btn-prev" text="Prev Page" onClick={onPrevPage} />
              </div>
              <div>
                <Button id="btn-next" text="Next Page" onClick={onNextPage} />
              </div>
            </div>
          )}
        </div>
      </BackgroundWrapper>
    </>
  );
};

const Home = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <Component />;
  }
  return (
    <BackgroundWrapper>
      <div></div>
    </BackgroundWrapper>
  );
};

export default Home;
