import Head from "next/head";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section>
      <Head>
        <title>Log In | Disney+</title>
      </Head>
      <div className="relative min-h-[calc(100vh-74px)]">
        <Image
          src="/images/hero-background.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex justify-center items-center">
        <div
          className="absolute flex flex-col space-y-3 top-1/4 
          w-full justify-center items-center max-w-screen-sm
          mx-auto p-8 -mt-16"
        >
          <Image
            src="/images/cta-logo-one.svg"
            width="600"
            height="150"
            objectFit="contain"
          />
          <button
            className="bg-blue-600 uppercase text-xl 
            tracking-wide font-extrabold py-4 px-6 w-full
            rounded hover:bg-[#0485ee] transition duration-200"
          >
            Get all there
          </button>
          <p className="text-xs text-center">
            Slobber’s all part of the job. Meet the leading pooch and his
            co-stars, now streaming on Disney+.
          </p>
          <Image
            src="/images/cta-logo-two.png"
            width="600"
            height="70"
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
