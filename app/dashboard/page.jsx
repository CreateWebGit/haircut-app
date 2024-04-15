"use client";
import UserInfo from "@/components/UserInfo";
import NextAuth from "next-auth/next";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const [company, setCompany] = useState("haha");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

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
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed: ");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Registrera</h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            value={company}
            placeholder="Företagsnamn"
            onChange={(e) => setCompany(e.target.value)}
          />
          <textarea
            rows="5"
            cols="33"
            value={description}
            placeholder="Beskrivning"
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="bg-green-600 text-white font-bold curser-pointer px-6 py-2">
            Registrera
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <Link className="text-sm mt-3 text-right" href={"/"}>
            Har redan ett konto? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
      <UserInfo />;
    </div>
  );
}
