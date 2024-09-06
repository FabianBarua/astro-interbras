import Atropos from "atropos/react";
import type { ProductItemHome } from "@/shared/types";
import "atropos/css";
import { getRelativeLocaleUrl } from "astro:i18n";

export const HomeProductCard = ({
  name,
  photo,
  isMagic,
  url,
  lang,
}: ProductItemHome): JSX.Element => {
  const urlWithLang = getRelativeLocaleUrl(lang || "es", url || "/");

  return (
    <Atropos
      shadow={false}
      className={`
          ${isMagic ? " sm:mt-4  mt-0 " : " mt-0"}
          cursor-pointer
          
          `}
    >
      <a
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        className={`
          mx-auto  sm:size-16 md:size-20 lg:size-28 xl:size-32  md:p-4 p-2  flex justify-center items-center rounded-3xl bg-interbrasGreen-500
          `}
        href={typeof urlWithLang === "string" ? urlWithLang : "/"}
      >
        <img
          data-atropos-offset="-5"
          className=" "
          src={photo}
          alt={typeof name === "string" ? name : ""}
        />
      </a>
      {isMagic && (
        <div className=" text-center mt-3 leading-5 text-lg hidden sm:block">
          {name}
        </div>
      )}
    </Atropos>
  );
};
