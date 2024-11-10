import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { Copy } from "lucide-react";

const CopyLink = ({ short_url, custom_url }) => {
  const [showOptions, setShowOptions] = useState(false);
  const siteUrl = import.meta.env.VITE_SITE_URL;

  const handleCopy = (url) => {
    try {
      navigator.clipboard.writeText(url);
      toast(`${url} Copied`, { type: "success" });
    } catch (error) {
      toast("Failed to copy link", { type: "error" });
    }
  };

  return (
    <div
      className="inline-block"
      onMouseEnter={() => custom_url && setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <Button variant="ghost" onClick={() => handleCopy(siteUrl + short_url)}>
        {showOptions ? "short_url" : <Copy />}
      </Button>
      {custom_url && showOptions && (
        <div className="left-0 mt-2">
          <Button
            variant="ghost"
            onClick={() => handleCopy(siteUrl + custom_url)}
          >
            {showOptions ? "custom_url" : <Copy />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CopyLink;
