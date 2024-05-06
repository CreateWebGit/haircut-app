"use client";

import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FileUpload } from "./file-upload";
import { UploadButton } from "@/utils/uploadthing";

export const ImageForm = ({ data }) => {
  const [isEditing, setEditing] = useState(false);
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const toggleEdit = () => setEditing((current) => !current);

  console.log(data);

  const session = useSession();
  const { status } = session;

  /*
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          console.log(data);
          setCompany(data.company);
          setDescription(data.desription);
          //setIsAdmin(data.admin);
          // setProfileFetched(true);
        });
      });
    }
  }, [session, status]);
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company || !description) {
      setError("Alla fält är nödvändiga!");
    } else {
      setError("");
    }

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          description,
        }),
      });

      if (res.ok) {
        const form = e.target;
        toggleEdit();
      } else {
        console.log("User registration failed: ");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex item-center justify-between">
        Course title
        <button onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil />
            </>
          )}
        </button>
      </div>
      {!isEditing ? (
        <div>
          <div>Företagsnamn</div>
          <div>{company}</div>
          <div>Beskrivning</div>
          <div>{description}</div>
        </div>
      ) : (
        <form className="" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>Företagsnamn</label>
            <input
              type="text"
              value={company}
              placeholder="Företagsnamn"
              onChange={(e) => setCompany(e.target.value)}
              className="myInput"
            />
          </div>
          <div className="flex flex-col">
            <label>Beskrivning</label>
            <textarea
              //type:string ="text"
              value={description}
              placeholder="Företagsnamn"
              onChange={(e) => setDescription(e.target.value)}
              className="myInput"
            />
          </div>
          <div>
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
          <div className="flex justify-end">
            <input type="submit" />
          </div>
        </form>
      )}
    </div>
  );
};
