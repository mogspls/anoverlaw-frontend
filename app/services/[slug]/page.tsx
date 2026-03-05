import Markdown from "react-markdown";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InquiryBanner } from "@/components/Banner";
import { fetchData } from "@/hooks/strapi-fetch";

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] };
};

async function getPracticeAreaBySlug(slug: string) {
  return fetchData(
    `/practice-areas?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate[lawyers][populate]=*`
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await fetchData(
    `/practice-areas?filters[slug][$eq]=${encodeURIComponent(params.slug)}`
  );

  const item = response?.data?.[0];

  if (!item?.attributes) {
    return {
      title: "Services | Añover Añover San Diego & Primavera Law Offices",
      robots: { index: false },
    };
  }

  const title = item.attributes?.name ?? "Services";
  const description = item.attributes?.description ?? "";

  return {
    title: `Services | ${title} | Añover Añover San Diego & Primavera Law Offices`,
    description,
  };
}

export default async function PracticeArea({
  params,
}: {
  params: { slug: string };
}) {
  const response = await getPracticeAreaBySlug(params.slug);

  const post = response?.data?.[0];

  if (!post?.attributes) {
    notFound();
  }

  return (
    <article>
      <header
        className="h-72 lg:h-80 bg-center bg-cover flex items-end justify-start"
        style={{ backgroundImage: "url(/images/services.jpg)" }}
      >
        <div className="mx-auto max-w-screen-lg w-full px-4">
          <div className="flex flex-col gap-6 pb-6 lg:pb-12">
            <h4 className="font-bold text-white">SERVICES</h4>
            <h1 className="text-5xl text-white spectral lg:text-6xl">
              {post.attributes.name}
            </h1>
          </div>
        </div>
      </header>

      <main id="service" className="bg-white py-12 lg:py-12 text-lg">
        <div id="container" className="mx-auto max-w-screen-lg w-full px-4">
          <section>
            <Markdown>{post.attributes.description ?? ""}</Markdown>
          </section>

          {/* <h1 className="spectral sc text-3xl before:h-1 before:contents-[''] before:bg-black before:block before:-translate-y-4 pt-12 before:w-12">
            Lawyers Specializing in {post.attributes.name}
          </h1>

          {post.attributes.lawyers?.data?.length !== 0 ? (
            <ul className="grid grid-cols-2 lg:grid-cols-2 p-4 py-12 gap-12">
              {post.attributes.lawyers.data.map((lawyer: any, key: number) => {
                return (
                  <li key={key}>
                    <a
                      href={`/lawyers/${lawyer.attributes.slug}`}
                      className="hover:underline spectral sc"
                    >
                      {lawyer.attributes.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>No one seems to be handling this. Kindly check back!</div>
          )} */}
        </div>
      </main>

      <InquiryBanner />
    </article>
  );
}