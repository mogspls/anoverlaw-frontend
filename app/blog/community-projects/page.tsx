import { InquiryBanner } from "@/components/Banner";
import { fetchData } from "@/hooks/strapi-fetch";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Community Projects — Añover Añover San Diego & Primavera Law Offices",
  description:
    "We are law practitioners with a collective experience spanning over 75 years, acquired from esteemed law firms, multinational conglomerates, respected corporations, and government offices. Our extensive experience, energy, and dynamism provide a steadfast assurance that we offer transparent, personalized, and cost-efficient services to our clients.",
};

export default async function CommunityProjects() {
  const req = await fetchData(`/blogposts?populate=*&pagination[pageSize]=100`);
  const response = await req.data;

  if (req?.meta.pagination.total == 0) {
    notFound();
  }

  const data = response.filter((blogpost: any) => {
    const positionSlug = blogpost.attributes.category?.data?.attributes?.slug;
    return positionSlug === "community-projects";
  });

  // console.log(data);

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
              Community Projects
            </h1>
          </div>
        </div>
      </header>
      <main className="bg-white">
        <div className="mx-auto max-w-screen-xl w-full px-4 ">
          <div className="py-12 grid-cols-1 sm:grid-cols-2 gap-12 md:grid-cols-3 grid ">
            {data.map((post: any, index: number) => {
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
                        href={`/blog/${post.attributes.category.data.attributes.slug}`}
                        className="hover:underline uppercase"
                      >
                        {post.attributes.category.data.attributes.title}
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
        </div>
      </main>
    </>
  );
}
