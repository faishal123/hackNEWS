/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useDebounce } from "src/functions/useDebounce";
import { isObjectEmpty } from "src/functions/object";
import {
  StoryType,
  IdsToGetType,
  GetTopStoriesResponse,
  UseFetchParam,
  fetchMultipleStoriesType,
  fetchTopStoriesFunctionType,
  DataFromLocalStorageType,
} from "./interface";
import { useState, useEffect } from "react";

const limit = 10;

const useFetch = ({ onCompleted, onError }: UseFetchParam) => {
  const fetchFunction = (url: string) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        onCompleted(data);
      })
      .catch((e) => {
        onError(e);
      });
  };

  return { fetchFunction };
};

const getDataFromLocalStorage = (): DataFromLocalStorageType => {
  const prevDataFromStorage =
    localStorage.getItem("hackerNewsDatas") || `{"byName":[], "arrayIds":[]}`;
  const prevDataParsed = JSON.parse(prevDataFromStorage);
  return prevDataParsed;
};

export const useGetAllTitles = () => {
  const [idsToGet, setIdsToGet] = useState<number[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(1);

  const remaining = idsToGet?.length || 1;
  const progress = Math.round(((totalAmount - remaining) / totalAmount) * 100);

  const { fetchFunction: fetchFunctionDatas } = useFetch({
    onCompleted: (data) => {
      const dataCorrect = data as StoryType;
      const id = dataCorrect?.id;
      const title = dataCorrect?.title?.toLowerCase();
      const prevData = getDataFromLocalStorage();

      const titleAlreadyExist = prevData?.byName?.reduce((a, c) => {
        if (c?.title === title) {
          return true;
        }
        return a;
      }, false);

      if (!titleAlreadyExist) {
        const newData = {
          byName: [...prevData?.byName, { id: id, title: title }],
          arrayIds: [...prevData?.arrayIds, id],
        };
        localStorage.setItem("hackerNewsDatas", JSON.stringify(newData));
      }
      setIdsToGet((prev) => prev?.filter((prevId) => prevId !== id));
    },
    onError: (e) => {
      console.log(e, "error get all title");
    },
  });

  const { fetchFunction: getAllTitles } = useFetch({
    onCompleted: (d) => {
      const dataToSet = d as number[];
      setTotalAmount(dataToSet?.length);
      setIdsToGet(dataToSet);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    getAllTitles(
      `https://hacker-news.firebaseio.com/v0/topstories.json?orderBy="$key"&limitToFirst=500`
    );
  }, []);

  useEffect(() => {
    if (idsToGet?.length > 0) {
      const firstId = idsToGet?.[0];
      const prevData = getDataFromLocalStorage();
      const firstIdAlreadyExist = prevData?.arrayIds?.includes(firstId);
      if (firstIdAlreadyExist) {
        setTimeout(() => {
          setIdsToGet((prev) => prev?.filter((prevId) => prevId !== firstId));
        }, 1);
      } else {
        fetchFunctionDatas(
          `https://hacker-news.firebaseio.com/v0/item/${firstId}.json`
        );
      }
    }
  }, [idsToGet]);

  return { progress };
};

let abortControllerGetTopStoriesIds: AbortController;

const fetchTopStoriesFunction: fetchTopStoriesFunctionType = async (
  setLoading,
  page
) => {
  abortControllerGetTopStoriesIds = new AbortController();
  setLoading(true);
  const startAt = (Number(page) - 1) * 10;
  const endAt = startAt + limit - 1;
  try {
    const response: GetTopStoriesResponse = await fetch(
      `https://hacker-news.firebaseio.com/v0/topstories.json?orderBy="$key"&startAt="${startAt}"&endAt="${endAt}"`,
      {
        signal: abortControllerGetTopStoriesIds.signal,
      }
    ).then((response) => response.json());
    setLoading(false);
    return { data: response, error: undefined };
  } catch (e) {
    setLoading(false);
    return { data: undefined, error: e };
  }
};

let abortControllerGetMultipleStories: AbortController;

const fetchMultipleStoriesFunction: fetchMultipleStoriesType = async (
  setLoading,
  ids
) => {
  abortControllerGetMultipleStories = new AbortController();
  setLoading(true);
  try {
    const response = await Promise.all(
      ids.map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
          signal: abortControllerGetMultipleStories.signal,
        }).then((res) => res.json())
      )
    );
    setLoading(false);
    return { data: response, error: undefined };
  } catch (e) {
    setLoading(false);
    return { data: undefined, error: e };
  }
};

export const useFetchTopStories = () => {
  const [idsToGet, setIdsToGet] = useState<IdsToGetType>([]);
  const [datasToShow, setDatasToShow] = useState<StoryType[]>([]);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 300);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const urlSearch = router?.query?.search as string;

  const isRouterReady = router?.isReady;
  const page = (router?.query?.page || "") as string;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchTopStoriesFunction(setLoading, page);
      if (res.data) {
        if (isObjectEmpty(res.data)) {
          setIdsToGet([]);
        } else {
          setIdsToGet(Object.values(res.data));
        }
      } else if (res.error) {
        if ((res.error as Error).name === "AbortError") {
          console.error(res.error);
        } else {
          setIdsToGet([]);
        }
      }
    };

    if (isRouterReady) {
      const searchValue = urlSearch || debouncedSearch || search;

      if (!page && !searchValue) {
        router.push("/?page=1");
      } else if (page) {
        fetchData();
      }
    }
  }, [isRouterReady, page]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchMultipleStoriesFunction(setLoading, idsToGet);

      if (res.data) {
        if (res?.data?.[0]?.id) {
          const backgroundWrapper =
            document.getElementById("backgroundWrapper");
          if (backgroundWrapper) {
            backgroundWrapper.scrollTo({ top: 0, behavior: "smooth" });
          }
          setDatasToShow(res.data);
        } else {
          setDatasToShow([]);
        }
      } else if (res.error) {
        if ((res.error as Error).name === "AbortError") {
        } else {
          setDatasToShow([]);
        }
      }
    };
    if (idsToGet?.length > 0) {
      fetchData();
    } else {
      setDatasToShow([]);
    }
  }, [idsToGet]);

  const abortAllFetch = () => {
    if (loading) {
      abortControllerGetMultipleStories.abort();
      abortControllerGetTopStoriesIds.abort();
    }
  };

  useEffect(() => {
    if (isRouterReady) {
      abortAllFetch();
      if (!!debouncedSearch) {
        router.push(`/?search=${debouncedSearch}`);
      } else {
        router.push(`/?page=1`);
      }
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (isRouterReady) {
      if (urlSearch) {
        if (urlSearch !== search) {
          setSearch(urlSearch);
        }
        if (Number(urlSearch)) {
          setIdsToGet([Number(urlSearch)]);
        } else {
          const localStorageData = getDataFromLocalStorage();
          const idToShow = localStorageData?.byName?.filter((o) => {
            return o?.title?.includes(urlSearch?.toLowerCase());
          });
          if (idToShow?.length > 0) {
            setIdsToGet(idToShow?.map((o) => o?.id));
          } else {
            setIdsToGet([]);
          }
        }
      }
    }
  }, [isRouterReady, urlSearch]);

  return {
    data: datasToShow,
    loading,
    onNextPage: () => {
      abortAllFetch();
      router.push(`/?page=${Number(page) + 1}`);
    },
    onPrevPage: () => {
      if (Number(page) > 1) {
        abortAllFetch();
        router.push(`/?page=${Number(page) - 1}`);
      }
    },
    search,
    setSearch,
    urlSearch,
  };
};
