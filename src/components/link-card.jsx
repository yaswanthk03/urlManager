/* eslint-disable react/prop-types */
import {Copy, Download, LinkIcon, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import {deleteUrl} from "@/db/apiUrls";
import {BeatLoader} from "react-spinners";
import DownloadImage from "./download-image";
import { QRCode } from "react-qrcode-logo";
import { toast } from "react-toastify";

const LinkCard = ({ url = [], fetchUrls }) => {
  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url.id);

  const siteUrl = import.meta.env.VITE_SITE_URL;
  const link = url?.custom_url ? url?.custom_url : url.short_url;
  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <QRCode
        size={128}
        className="h-32 object-contain ring ring-blue-500 self-start"
        value={siteUrl + (url?.custom_url || url?.short_url)}
        ecLevel="H"
        bgColor="#ffffff"
        fgColor="#000000"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          {siteUrl}
          {url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          <LinkIcon className="p-1" />
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            try {
              navigator.clipboard.writeText(`${siteUrl + link}`);
              toast(`${siteUrl + link} Copied`, { type: "success" });
            } catch (error) {
              toast("Failed to copy link", { type: "error" });
            }
          }}
        >
          <Copy />
        </Button>
        <DownloadImage url={url} />

        <Button
          variant="ghost"
          onClick={() => {
            fnDelete().then(() => fetchUrls());
            toast(`Link deleted successfully`, { type: "success" });
          }}
          disable={loadingDelete}
        >
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
