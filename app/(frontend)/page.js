"use client";
import Dropdown from "@/components/Dropdown";
import { UploadButton } from "@/utils/uploadthing";

export default function Home() {
  return (
    <div className="grid place-items-center h-screen">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
