"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isData, setData] = useState();

  const session = useSession();
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          console.log(data);
          setData(data);
          //setCompany(data.company);
          //setDescription(data.desription);
          //setIsAdmin(data.admin);
          // setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace(`dashboard/${isData._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  /*
  const url = "https://api.example.com/users/123";

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log("My data", data);
    })
    .catch((error) => {
      console.log("Error ", error);
    });

  //POST

  const jsonData = { key1: "value1", key2: "value2" };

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(jsonData),
  };

  fetch("https://api.example/upload", options)
    .then((res) => {
      if (!res) {
        throw new error("error");
      }
      return res.json();
    })
    .then((data) => {
      console.log("My data ", data);
    })
    .catch((error) => {
      console.log("Error ", error);
    });

    */

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-center" href={"/forget-password"}>
            Glömt lösenord? <span className="underline">Återställ</span>
          </Link>

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Do you not have an account?{" "}
            <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Page;
