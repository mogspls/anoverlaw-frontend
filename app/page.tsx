import type { Metadata } from "next";
import Banner from "@/components/Banner";
import { fetchData } from "@/hooks/strapi-fetch";

export const metadata: Metadata = {
  title: "Home — Añover Añover San Diego & Primavera Law Offices",
  description:
    "Añover Añover San Diego & Primavera Law Offices is a full service law firm that delivers high quality and specialized legal services to a wide array of clients. Founded in 2010 by law practitioners with collective experience gained from prestigious law firms, respected corporations and government offices, it has grown further in its practice throughout the years with the assurance that its services remain unparalleled and exceptional. Concurrently, the relationships it has built with its clients continue to be marked with sterling communication and genuine interaction while dynamically adapting to each of their legal needs.",
};

interface Post {
  id: number;
  attributes: PostAttributes;
}
interface PostAttributes {
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  banner?: BannerAttributes;
  category: {
    data: {
      id: number;
      attributes: {
        title: string;
        slug: string;
      };
    };
  };
}
interface BannerAttributes {
  data: {
    id: number;
    attributes: {
      name: string;
      url: string;
    };
  };
}

export default async function Home() {
  const posts = await fetchData(`/blogposts?populate=*&pagination[pageSize]=100`);
  return (
    <main>
      <section
        id="landing"
        style={{ backgroundImage: "url('/images/home/landing-page.jpg')" }}
        className="min-h-[560px] lg:h-[720px] bg-cover relative bg-center flex items-center"
      >
        <div className="max-w-screen-xl w-full mx-auto flex items-center h-full px-2">
          <div className="w-full max-w-[720px] flex flex-col gap-12">
            <h1 className="spectral sc text-2xl sm:text-3xl lg:text-6xl text-white after:contents-[''] after:block after:h-1 after:bg-white relative after:absolute after:w-12 after:-bottom-6">
              Full-service <br /> Complete disclosure <br /> Strategic lawyering
            </h1>
            <p className="opensans text-slate-400">
              The Firm’s clientele not only consists of private individuals but
              also of businesses ranging from startups to multinational
              companies and cuts across different industries such as, but not
              limited to, manufacturing, export, manpower, technology,
              education, health and energy.
            </p>
            <div className="flex">
              <a href="/lawyers" className="px-12 py-4 bg-[#1B387D] text-white">
                MEET THE TEAM
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="second" className="bg-white p-4">
        <div className="max-w-screen-xl mx-auto py-12 lg:py-24 flex flex-col lg:flex-row gap-12 lg:gap-4">
          <div className="flex flex-col gap-8 flex-1">
            <h6 className="opensans text-black uppercase font-bold">
              ABOUT THE LAW FIRM
            </h6>
            <h2 className="spectral sc text-xl md:text-3xl lg:text-4xl">
              &ldquo;A full-service law firm that delivers high quality and
              specialized legal services to a wide array of clients.&rdquo;
            </h2>
            <hr className="w-24 border border-black" />
            <p className="pb-4">
              We are law practitioners with a collective experience spanning
              over 75 years, acquired from esteemed law firms, multinational
              conglomerates, respected corporations, and government offices.{" "}
            </p>
            <div className="flex">
              <a href="/about" className="px-12 py-4 text-white bg-[#1B387D]">
                LEARN MORE
              </a>
            </div>
          </div>
          <div className="flex-1 flex items-center">
            <img
              src={"/images/home/aasp-partners.jpg"}
              alt=""
              className="w-full flex-1"
            />
          </div>
        </div>
      </section>
      <Banner
        subtitle="OUR SERVICES"
        title="&ldquo;A&ntilde;over A&ntilde;over San Diego &amp; Primavera Law Offices has grown into a full service firm built on its commitment to provide competent legal services to its client-partners&rdquo;"
        anchor="OUR SERVICES"
        href="/services"
        backgroundImage="/images/components/banner-bg.jpg"
      />
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-screen-xl">
          <h4 className="spectral before:content-[''] before:flex before:w-full before:h-[1px] before:bg-[#000] after:content-[''] after:flex after:w-full after:h-[1px] after:bg-[#000] flex items-center justify-center w-full px-4 pb-12 text-[#000] text-4xl">
            <span className="px-12">Publications</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-auto max-w-screen-xl px-4">
            {posts.data.slice(0, 3).map((post: Post, index: number) => {
              return (
                <article className="flex flex-col gap-4" key={index}>
                  <a href={`/blog/${post.attributes.slug}`}>
                    <div
                      className="h-60 bg-center bg-cover"
                      style={{
                        backgroundImage: post.attributes.banner
                          ? `url(${post.attributes.banner?.data?.attributes?.url})`
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
          <div className="flex items-center justify-center pt-12">
            <div>
              <a
                href="/blog"
                className="px-12 py-4 bg-[#1B387D] text-white"
              >
                READ MORE
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
