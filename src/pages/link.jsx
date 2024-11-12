import PieChart from "@/components/pie-chart";
import DownloadImage from "@/components/download-image";
import Engagement from "@/components/engagement-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { LinkIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { QRCode } from "react-qrcode-logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CopyLink from "@/components/copy-link";

const LinkPage = () => {
  const navigate = useNavigate();
  const { user } = UrlState();
  const [dispalyStats, setDispalyStats] = useState("");

  const { id } = useParams();
  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }
  const siteUrl = import.meta.env.VITE_SITE_URL;

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/4">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={siteUrl + `${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            {siteUrl + link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <CopyLink short_url={url?.short_url} custom_url={url?.custom_url} />
            <DownloadImage url={url} />
            <Button
              variant="ghost"
              onClick={() =>
                fnDelete().then(() => {
                  navigate("/dashboard");
                  toast(`Link deleted successfully`, { type: "success" });
                })
              }
              disable={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <QRCode
            size={200}
            className="h-52 self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            value={siteUrl + (url?.custom_url || url?.short_url)}
            ecLevel="H"
            bgColor="#ffffff"
            fgColor="#000000"
          />
          {stats?.length !== 0 && (
            <table className="scrolldown">
              <tbody>
                <tr className="text-green-500">
                  <td>
                    <b>Extension</b>
                  </td>
                  <td>
                    <b>City</b>
                  </td>
                  <td>
                    <b>Device</b>
                  </td>
                  <td className="w-32">
                    <b>DateTime</b>
                  </td>
                </tr>

                {stats?.map((stat, i) => (
                  <tr key={i}>
                    <td className="font-medium">{stat.extension}</td>
                    <td>{stat.city}</td>
                    <td>{stat.device}</td>
                    <td className="w-32">
                      {new Date(stat.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Card className="sm:w-2/4">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Engagements over time</CardTitle>
              <Engagement stats={stats} />
              <div className="flex items-center gap-5 mt-4">
                <Card className="p-2">Select stat:</Card>
                <Select
                  onValueChange={(e) => setDispalyStats(e)}
                  defaultValue={setDispalyStats}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="city" difault>
                      City
                    </SelectItem>
                    <SelectItem value="device">Device</SelectItem>
                    <SelectItem value="extension">Extension</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {dispalyStats ? (
                <>
                  <CardTitle>{dispalyStats?.toUpperCase()} INFO:</CardTitle>
                  <PieChart stats={stats} value={dispalyStats} />
                </>
              ) : (
                <>
                  <CardTitle>CITY INFO:</CardTitle>
                  <PieChart stats={stats} value="city" />
                </>
              )}
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Statistics yet"
                : "Loading Statistics.."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default LinkPage;
