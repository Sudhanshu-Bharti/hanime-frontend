"use client";

import InfoComponent from "@/components/info-anime";
import React, { useEffect, useState } from "react";
import Video from "@/components/video";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8080/getInfo/${params.slug}`
        );
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.slug]);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8080/getVideo/${params.slug}`);
        const result = await res.json();
        console.log(result);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    getVideo();
  }, [params.slug]);

  return (
    <div className="flex flex-col items-center p-5">
      {data && <InfoComponent data={data} className="mb-5" />}
      <section id="video" className="mt-5">
        <Video
          //@ts-ignore
          params={params.slug}
          className="max-w-full shadow-lg rounded-lg overflow-hidden"
        />
      </section>
    </div>
  );
};

export default Page;