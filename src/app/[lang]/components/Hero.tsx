"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getStrapiMedia } from "../utils/api-helpers";
import { fetchAPI } from "../utils/fetch-api";
import { renderButtonStyle } from "../utils/render-button-style";
import HighlightedText from "./HighlightedText";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: Button[];
    has_search_box: boolean;
  };
}

async function getSearchBox(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token) throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/search-box`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: '*',
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export default function Hero({ data }: HeroProps) {
  const [search, setSearch] = useState<string>('')
  const [searchBox, setSearchBox] = useState<any>()
  const { push } = useRouter();
  
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);

  useEffect( () => {
    (async()=>{
        if (data.has_search_box) {
          const body = await getSearchBox();
          setSearchBox(body.data.attributes)
        }
    })()
}, [data.has_search_box])

  

function handleSubmit() {
  return push(`/search?q=${search}`);
}

  return (
    <section>
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-lg lg:max-w-md xl:max-w-lg lg:text-left">
          <HighlightedText
            text={data.title}
            tag="h1"
            className="text-5xl font-bold leading-none sm:text-6xl mb-8"
            color="dark:text-violet-400"
          />

          <HighlightedText
            text={data.description}
            tag="p"
            className="tmt-6 mb-8 text-lg sm:mb-12"
            color="dark:text-violet-400"
          />
          <div className="flex flex-row sm:items-center sm:justify-center lg:justify-start">
            {data.has_search_box ?
              <>
              <input
                type="email"
                placeholder={searchBox?.field?.placeholder ?? ''}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className={"w-full p-3 rounded-l-lg bg-secondary text-text outline-none focus:ring-1 focus:ring-primary"}
              />
              <button
                type="button"
                className="w-auto p-4 rounded-r-lg bg-primary dark:text-gray-900"
                onClick={handleSubmit}
              >
                <FaSearch/>
              </button>
            </>
            : data.buttons.map((button: Button, index: number) => (
              <Link
                key={index}
                href={button.url}
                target={button.newTab ? "_blank" : "_self"}
                className={renderButtonStyle(button.type)}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <Image
            src={imgUrl || ""}
            alt={
              data.picture.data.attributes.alternativeText || "none provided"
            }
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 "
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}
