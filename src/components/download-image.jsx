import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

const DownloadImage = ({ url }) => {
  const downloadImage = async () => {
    try {
      const imageUrl = url?.qr;
      const fileName = url?.title || "downloaded_image";

      if (!imageUrl) {
        console.error("Image URL is not defined.");
        return;
      }

      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element for download
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = fileName;

      // Append the anchor to the body
      document.body.appendChild(anchor);

      // Trigger the download by simulating a click event
      anchor.click();

      // Clean up: remove the anchor and revoke the blob URL
      document.body.removeChild(anchor);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("An error occurred while downloading the image:", error);
    }
  };
  return (
    <Button variant="ghost" onClick={downloadImage}>
      <Download />
    </Button>
  );
};

export default DownloadImage;
