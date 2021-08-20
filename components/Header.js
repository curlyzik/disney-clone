import React from "react";
import Image from "next/image";
import {
  HomeIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

const Header = () => {
  const [session] = useSession();
  const router = useRouter();

  return (
    <header className="sticky bg-[#040714] top-0 z-[1000] h-[4.5rem] flex items-center px-10 md:px-12">
      <Image
        src="/images/logo.svg"
        width={80}
        height={80}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />

      {session && (
      <nav className="hidden ml-10 md:flex items-center space-x-6">
        <a className="header-link group">
          <HomeIcon className="h-4" />
          <span className="span">Home</span>
        </a>
        <a className="header-link group">
          <SearchIcon className="h-4" />
          <span className="span">Search</span>
        </a>
        <a className="header-link group">
          <PlusIcon className="h-4" />
          <span className="span">Watchlist</span>
        </a>
        <a className="header-link group">
          <StarIcon className="h-4" />
          <span className="span">Originals</span>
        </a>
        <a className="header-link group">
          <img src="/images/movie-icon.svg" alt="" className="h-5" />
          <span className="span">Movies</span>
        </a>
        <a className="header-link group">
          <img src="/images/series-icon.svg" alt="" className="h-5" />
          <span className="span">Series</span>
        </a>
      </nav>
      )}

      {!session ? (
        <button
          className=" uppercase border 
        px-4 py-1 ml-auto rounded font-medium
        tracking-wide hover:bg-white
        hover:text-black transition duration-100"
          onClick={signIn}
        >
          Login
        </button>
      ) : (
        <img
          src={session.user.image}
          className="ml-auto w-12 h-12 rounded-full object-cover cursor-pointer"
          onClick={signOut}
        />
      )}
    </header>
  );
};

export default Header;
