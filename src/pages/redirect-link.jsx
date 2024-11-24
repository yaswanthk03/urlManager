import {storeClicks} from "@/db/apiClicks";
import {getLongUrl} from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {BarLoader} from "react-spinners";
import ErrorPage from "./error-page";

const RedirectLink = () => {
  const { id } = useParams();
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { loading, data, fn } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
    short_url: id,
  });

  useEffect(() => {
    fn().then(() => {
      setIsDataFetched(true);
    });
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isDataFetched]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  } else if (isDataFetched && !data) {
    return <ErrorPage />;
  }
  return null;
};

export default RedirectLink;
