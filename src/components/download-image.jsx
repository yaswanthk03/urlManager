import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { QRCode } from "react-qrcode-logo";
import { Card } from "./ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toPng } from "html-to-image";
import { toast } from "react-toastify";

const DownloadImage = ({ url }) => {
  const displayRef = useRef();
  const downloadRef = useRef();
  const siteUrl = import.meta.env.VITE_SITE_URL;

  const [formValues, setFormValues] = useState({
    fileName: "",
    description: "",
    qrStyle: "squares",
    eyeRadius: 0,
    customUrl: false,
    extension: "",
    size: 200,
  });

  const [color, setColor] = useState({
    bgColor: "#ffffff",
    fgColor: "#000000",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const downloadImage = async () => {
    try {
      // Ensure the QR code component is available
      if (!downloadRef.current) return;

      // Capture the div as a PNG image
      const dataUrl = await toPng(downloadRef.current);

      // Create an anchor element for download
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = formValues.fileName || "QR_Code_Image.png";

      // Append the anchor to the body
      document.body.appendChild(anchor);

      // Trigger the download by simulating a click event
      anchor.click();

      // Clean up: remove the anchor
      document.body.removeChild(anchor);
      toast("Image downloaded successfully", { type: "success" });
    } catch (error) {
      console.error("Error downloading image:", error);
    }
    // Use the file name if provided, otherwise default to 'QR_Code_Image'
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Download />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="fixed inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   max-h-screen h-3/4 w-full max-w-max p-6 rounded-lg border-2 border-gray-700"
      >
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center font-bold text-2xl">
            <span>Create New QR Code</span>
            <DialogClose asChild>
              <Button className="bg-green-500 mr-5" onClick={downloadImage}>
                Direct Download
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <QRCode
          ref={displayRef}
          size={150}
          value={
            siteUrl +
            (formValues.customUrl
              ? url.custom_url
              : url?.short_url + formValues.extension)
          }
          ecLevel="H"
          bgColor={color.bgColor}
          fgColor={color.fgColor}
          qrStyle={formValues.qrStyle}
          eyeRadius={formValues.eyeRadius}
        />
        {/* Hidden Downloadable QR Code */}
        <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
          <div
            ref={downloadRef}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              backgroundColor: "#fff",
              border: "2px solid #000",
              borderRadius: "10px",
            }}
          >
            <span
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              urlmanger.in
            </span>
            <QRCode
              size={400}
              value={
                siteUrl +
                (formValues.customUrl
                  ? url.custom_url
                  : url?.short_url + formValues.extension)
              }
              ecLevel="H"
              bgColor={color.bgColor}
              fgColor={color.fgColor}
              qrStyle={formValues.qrStyle}
              eyeRadius={formValues.eyeRadius}
            />
            {formValues.description && (
              <span
                style={{
                  marginTop: "10px",
                  color: "black",
                }}
              >
                {formValues.description}
              </span>
            )}

            <span
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              {siteUrl}
              {formValues.customUrl
                ? url.custom_url
                : url?.short_url + formValues.extension}
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          <Input
            id="fileName"
            placeholder="File name"
            value={formValues.fileName}
            onChange={handleChange}
            className="mt-4"
          />

          <Input
            id="description"
            placeholder="Description"
            value={formValues.description}
            onChange={handleChange}
            className="mt-2"
          />

          <div className="flex items-center gap-3 mt-4">
            <Card className="p-2">Use custom URL?</Card>
            <Button
              id="customUrl"
              type="button"
              variant={formValues.customUrl ? "solid" : "outline"}
              onClick={() =>
                setFormValues((prev) => ({
                  ...prev,
                  customUrl: !prev.customUrl,
                }))
              }
            >
              {formValues.customUrl ? "Yes" : "No"}
            </Button>
          </div>

          {!formValues.customUrl && (
            <div className="flex items-center gap-2 mt-2">
              <Card className="p-2">{url?.short_url}</Card>
              <Input
                id="extension"
                placeholder="Extension (optional)"
                value={formValues.extension}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="flex items-center gap-3 mt-4">
            <Card className="p-2">QR Eye Radius</Card>
            <Slider
              className="sm:w-1/3"
              onValueChange={(e) =>
                setFormValues({ ...formValues, eyeRadius: e[0] })
              }
              defaultValue={[0]}
              max={25}
              step={1}
            />
          </div>

          <p className="mt-4">Select Color Palette:</p>
          <div className="flex gap-5 mt-2">
            <div className="flex gap-1">
              {[
                ["#990011", "#FCF6F5"],
                ["#101820", "#F2AA4C"],
                ["#000000", "#FFFFFF"],
                ["#00203F", "#ADEFD1"],
              ].map((colors, index) => (
                <button
                  key={index}
                  className="h-12 w-12 m-1 border-solid border-white border-2"
                  style={{ background: colors[1] }}
                  onClick={() =>
                    setColor({
                      bgColor: colors[1],
                      fgColor: colors[0],
                    })
                  }
                >
                  <div
                    className="h-6 w-6 m-auto"
                    style={{ background: colors[0] }}
                  ></div>
                </button>
              ))}
            </div>
            <div className="m-2">OR</div>
            <div className="flex gap-2 items-center">
              <span>BG:</span>
              <Input
                onChange={(e) =>
                  setColor({ ...color, bgColor: e.target.value })
                }
                type="color"
                className="w-12 border-solid border-2 border-white"
              />
              <span>FG:</span>
              <Input
                onChange={(e) =>
                  setColor({ ...color, fgColor: e.target.value })
                }
                type="color"
                className="w-12 border-solid border-2 border-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-5 mt-4">
            <Card className="p-2">QR Style</Card>
            <Select
              onValueChange={(e) =>
                setFormValues({ ...formValues, qrStyle: e })
              }
              defaultValue={formValues.qrStyle}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="squares">Squares</SelectItem>
                <SelectItem value="dots">Dots</SelectItem>
                <SelectItem value="fluid">Fluid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="flex justify-center mt-6">
            <Button
              type="button"
              className="bg-green-500 hover:bg-green-600"
              onClick={downloadImage}
            >
              Download
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadImage;
