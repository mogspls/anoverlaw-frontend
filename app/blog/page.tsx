import { InquiryBanner } from "@/components/Banner";
import { fetchData } from "@/hooks/strapi-fetch";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Publications — Añover Añover San Diego & Primavera Law Offices",
  description:
    "We are law practitioners with a collective experience spanning over 75 years, acquired from esteemed law firms, multinational conglomerates, respected corporations, and government offices. Our extensive experience, energy, and dynamism provide a steadfast assurance that we offer transparent, personalized, and cost-efficient services to our clients.",
};

export default async function CommunityProjects() {
  const req = await fetchData(`/blogposts?populate=*&pagination[pageSize]=100`);
  const response = await req.data;

  // if (req?.meta.pagination.total == 0) {
  //   notFound();
  // }

  return (
    <>
      <header
        className="h-56 lg:h-80 bg-center bg-cover flex items-end justify-start"
        style={{ backgroundImage: "url(/images/services.jpg)" }}
      >
        <div className="mx-auto max-w-screen-xl w-full px-4">
          <div className="flex flex-col gap-6 pb-6 lg:pb-12">
            <h4 className="font-bold text-white">PUBLICATIONS</h4>
            <h1 className="text-5xl text-white spectral lg:text-6xl">
              Latest Articles
            </h1>
          </div>
        </div>
      </header>
      <main className="bg-white">
        <div className="mx-auto max-w-screen-xl w-full px-4 ">
          {response.length !== 0 ? (
            <div className="py-12 grid-cols-1 sm:grid-cols-2 gap-12 md:grid-cols-3 grid">
              {response.map((post: any, index: number) => {
                return (
                  <article className="flex flex-col gap-4" key={index}>
                    <a href={`/blog/${post.attributes.slug}`}>
                      <div
                        className="h-60 bg-center bg-cover"
                        style={{
                          backgroundImage: post.attributes.banner
                            ? `url(${post.attributes.banner?.data.attributes.url})`
                            : `url('/images/components/banner-bg.jpg')`,
                        }}
                      ></div>
                    </a>
                    <section className="flex flex-col gap-2">
                      <div>
                        <a
                          href={`/blog/${post.attributes.category?.data?.attributes.slug}`}
                          className="hover:underline uppercase"
                        >
                          {post.attributes.category.data?.attributes.title}
                        </a>
                      </div>
                      <div>
                        <a
                          href={`/blog/${post.attributes.slug}`}
                          className="hover:underline"
                        >
                          <h1 className="spectral text-4xl text-[#1B387D]">
                            {post.attributes.title}
                          </h1>
                        </a>
                      </div>
                      <p className="py-1">
                        {post.attributes.body.substring(0, 150)}...
                      </p>
                    </section>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="py-24 text-center">
              <svg
                className="mx-auto mb-4 w-24 h-24 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M331.8 224.1c28.29 0 54.88 10.99 74.86 30.97l19.59 19.59c40.01-17.74 71.25-53.3 81.62-96.65c5.725-23.92 5.34-47.08 .2148-68.4c-2.613-10.88-16.43-14.51-24.34-6.604l-68.9 68.9h-75.6V97.2l68.9-68.9c7.912-7.912 4.275-21.73-6.604-24.34c-21.32-5.125-44.48-5.51-68.4 .2148c-55.3 13.23-98.39 60.22-107.2 116.4C224.5 128.9 224.2 137 224.3 145l82.78 82.86C315.2 225.1 323.5 224.1 331.8 224.1zM384 278.6c-23.16-23.16-57.57-27.57-85.39-13.9L191.1 158L191.1 95.99l-127.1-95.99L0 63.1l96 127.1l62.04 .0077l106.7 106.6c-13.67 27.82-9.251 62.23 13.91 85.39l117 117.1c14.62 14.5 38.21 14.5 52.71-.0016l52.75-52.75c14.5-14.5 14.5-38.08-.0016-52.71L384 278.6zM227.9 307L168.7 247.9l-148.9 148.9c-26.37 26.37-26.37 69.08 0 95.45C32.96 505.4 50.21 512 67.5 512s34.54-6.592 47.72-19.78l119.1-119.1C225.5 352.3 222.6 329.4 227.9 307zM64 472c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24S88 434.7 88 448C88 461.3 77.25 472 64 472z"
                />
              </svg>
              <h1 className="spectral text-center text-4xl">Under Maintenance.</h1>
              <p>Kindly check back again next time!</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
