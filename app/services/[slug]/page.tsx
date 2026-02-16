import Markdown from "react-markdown";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { InquiryBanner } from "@/components/Banner";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] };
};

// small helper: logs HTML preview if Strapi returns non-JSON (403/HTML/WAF/etc)
async function fetchStrapiJson(url: string, label: string) {
  const res = await fetch(url, { next: { revalidate: 0 } });

  const ct = res.headers.get("content-type") || "";
  if (!res.ok || !ct.includes("application/json")) {
    const body = await res.text();
    console.log(`STRAPI_NON_JSON(${label})`, {
      url,
      status: res.status,
      ct,
      bodyPreview: body.slice(0, 300),
    });
    throw new Error(`Strapi returned non-JSON (${res.status})`);
  }

  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const url = `${BASE_URL}/api/practice-areas?filters[slug][$eq]=${encodeURIComponent(
    params.slug
  )}`;

  try {
    const response = await fetchStrapiJson(url, "services:generateMetadata");

    const title = response?.data?.[0]?.attributes?.name ?? "Services";
    const description = response?.data?.[0]?.attributes?.description ?? "";

    return {
      title: `Services | ${title} | Añover Añover San Diego & Primavera Law Offices`,
      description,
    };
  } catch {
    return {
      title: "Services | Añover Añover San Diego & Primavera Law Offices",
      robots: { index: false },
    };
  }
}

async function getPostBySlug(slug: string) {
  const url = `${BASE_URL}/api/practice-areas?filters[slug][$eq]=${encodeURIComponent(
    slug
  )}&populate[lawyers][populate]=*`;

  return fetchStrapiJson(url, "services:getPostBySlug");
}

export default async function PracticeArea({
  params,
}: {
  params: { slug: string };
}) {
  const response = await getPostBySlug(params.slug);

  if (!response?.data?.length || response?.meta?.pagination?.total === 0) {
    notFound();
  }
  const post = response.data[0];

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
              {post?.attributes.name}
            </h1>
          </div>
        </div>
      </header>
      <main id="service" className="bg-white py-12 lg:py-12 text-lg">
        <div id="container" className="mx-auto max-w-screen-lg w-full px-4">
          <section>
            <Markdown>{post?.attributes.description}</Markdown>
          </section>
          {/* <h1 className="spectral sc text-3xl before:h-1 before:contents-[''] before:bg-black before:block before:-translate-y-4 pt-12 before:w-12">
            Lawyers Specializing in {post?.attributes.name}
          </h1>
          {post?.attributes.lawyers.data.length !== 0 ? (
            <>
              <ul className="grid grid-cols-2 lg:grid-cols-2 p-4 py-12 gap-12">
                {post?.attributes.lawyers.data.map(
                  (lawyer: LawyerAttributes, key: number) => {
                    // console.log(lawyer);
                    return (
                      <li key={key}>
                        <a
                          href={`/lawyers/${lawyer.attributes.slug}`}
                          className="hover:underline spectral sc"
                          key={key}
                        >
                          {lawyer.attributes.name}
                        </a>
                      </li>
                    );
                  }
                )}
              </ul>
            </>
          ) : (
            <div>No one seems to be handling this. Kindly check back!</div>
          )} */}
        </div>
      </main>
      <InquiryBanner />
    </article>
  );
}
