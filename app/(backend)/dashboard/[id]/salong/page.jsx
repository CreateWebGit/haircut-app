import { ImageForm } from "@/components/image-form";
import { TitleForm } from "@/components/title-form";
//import { useSession } from "next-auth/react";
//import { useEffect, useState } from "react";
//import { useRouter } from "next/router";

async function getData(id) {
  const res = await fetch(`https://haircut-app.vercel.app/api/profile/${id}`, {
    cache: "no-store",
  });
  const data = res.json();
  /*
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
  console.log(res);
  */
  console.log(data);
  return data;
}

export default async function Home(params) {
  //const router = useRouter();
  const mydata = await getData(params.params.id);
  console.log(mydata);
  console.log(params.params.id);
  //const [data, setData] = useState([]);
  //console.log(data);

  //const session = useSession();
  //const { status } = session;
  /*
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          console.log(data);
          setData([data]);

          //setIsAdmin(data.admin);
          // setProfileFetched(true);
        });
      });
    }
  }, [session, status]);
*/
  return (
    <div className="mx-24">
      <TitleForm data={mydata} />
      <ImageForm />
    </div>
  );
}
