"use client";
import UserInfo from "@/components/UserInfo";
import NextAuth from "next-auth/next";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Dropdown from "@/components/Dropdown";

export default function Dashboard() {
  const [company, setCompany] = useState("haha");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [formSection, setFormSection] = useState("about");

  const [isActiveKlippning, setActiveKlippning] = useState(false);

  const router = useRouter();
  const session = useSession();
  const { status } = session;

  //console.log(name);

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
      } else {
        console.log("User registration failed: ");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center gap-2">
        <button onClick={() => setFormSection("about")}>Om oss</button>
        <button onClick={() => setFormSection("price")}>Våra priser</button>
        <button onClick={() => setFormSection("contact")}>Kontakta</button>
      </div>
      <div className="flex flex-col items-center justify-center p-5  ">
        <h1 className="text-xl font-bold my-4">Registrera</h1>

        <form className="" onSubmit={handleSubmit}>
          {formSection === "about" ? (
            <div className="w-[600px] flex flex-col gap-3">
              <label className="myLabel">Företagsnamn</label>
              <input
                type="text"
                value={company}
                placeholder="Företagsnamn"
                onChange={(e) => setCompany(e.target.value)}
                className="myInput"
              />
              <label className="myLabel">Beskrivning</label>
              <textarea
                rows="5"
                cols="33"
                value={description}
                placeholder="Beskrivning"
                onChange={(e) => setDescription(e.target.value)}
                className="myTextarea"
              />
            </div>
          ) : (
            ""
          )}

          {formSection === "price" ? (
            <div className="w-[600px]">
              <Dropdown title={"Klippning"}>
                <div className="">
                  <div>Herrklippning</div>
                  <div className="flex">
                    <label className="flex-1 text-right text-xl">priser:</label>
                    <div className="flex-1">
                      <div className="flex gap-2 items-center">
                        <input
                          className="w-[100px]"
                          type="text"
                          value={company}
                          placeholder="Företagsnamn"
                          onChange={(e) => setCompany(e.target.value)}
                        />
                        <div>Kr</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <label className="flex-1 text-right text-xl">Tid:</label>
                    <div className="flex-1">
                      <div className="flex gap-2 items-center">
                        <input
                          className="w-[100px]"
                          type="text"
                          value={company}
                          placeholder="Företagsnamn"
                          onChange={(e) => setCompany(e.target.value)}
                        />
                        <div>minuter</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dropdown>
            </div>
          ) : (
            ""
          )}

          {formSection === "contact" ? (
            <div className="w-[600px]">
              <label>{formSection}contact</label>
              <input
                type="text"
                value={company}
                placeholder="Företagsnamn"
                onChange={(e) => setCompany(e.target.value)}
              />
              <label>Beskrivning</label>
              <textarea
                rows="5"
                cols="33"
                value={description}
                placeholder="Beskrivning"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-end mt-8">
            <button className="bg-green-600 text-white font-bold curser-pointer px-6 py-2">
              Registrera
            </button>

            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
      <UserInfo />;
    </div>
  );
}
