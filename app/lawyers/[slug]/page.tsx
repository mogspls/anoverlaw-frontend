import { InquiryBanner } from "@/components/Banner";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

interface Response {
  meta: {
    pagination: {
      total: number;
    };
  };
  data: {
    id?: number;
    attributes?: LawyerAttributes;
  };
}

interface LawyerAttributes {
  name: string;
  slug: string;
  profile_picture: {
    data: {
      attributes: {
        url: string;
        name: string;
      };
    };
  };
  position: {
    data: {
      attributes: {
        name: string;
      };
    };
  };
}

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export async function getPostBySlug(slug: string) {
  const res = await fetch(
    `${BASE_URL}/api/lawyers?filters[slug][$eq]=${slug}&populate=*`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return res.json();
}

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const response = await fetch(
    `${BASE_URL}/api/lawyers?filters[slug][$eq]=${params.slug}&populate=*`
  ).then((res) => res.json());

  const title = response.data[0].attributes.name;
  const description = response.data[0].attributes.description;
  const position = response.data[0].attributes.position.data.attributes.title;

  return {
    title: `${title} — ${position} | Añover Añover San Diego & Primavera Law Offices`,
    description: `${description}`,
  };
}

export default async function LawyerPage({
  params,
}: {
  params: { slug: string };
}) {
  const response = await getPostBySlug(params.slug);
  const data = response.data[0];

  if (response?.meta.pagination.total == 0) {
    notFound();
  }

  // console.log(data.attributes);

  return (
    <>
      <article id={data.attributes.slug} className="lawyer bg-white md:py-24">
        <div className="mx-auto max-w-screen-xl w-full flex flex-col md:flex-row md:px-4">
          <aside>
            <div className="w-full max-w-full md:max-w-96 md:sticky md:top-24">
              <div className="flex flex-col md:flex-col gap-6">
                <img
                  src={data.attributes.profile_picture.data.attributes.url}
                  alt={data.attributes.name}
                  className="object-cover aspect-[9/12] object-top w-full"
                />
              </div>
              <header className="border-b border-black flex flex-col gap-2">
                <div className="p-6 px-4 md:px-0">
                  <h4 className="uppercase text-lg md:text-lg font-bold">
                    {data.attributes.position.data.attributes.title}
                  </h4>
                  <h1 className="spectral sc text-3xl md:text-2xl">
                    {data.attributes.name}
                  </h1>
                  <a
                    href={`mailto:${data.attributes.email}`}
                    className="hover:underline text-lg"
                  >
                    {data.attributes.email}
                  </a>
                </div>
              </header>
            </div>
          </aside>
          <main className="w-full pt-4 px-4 md:px-12 md:pt-0">
            <section>
              {data.attributes.description && (
                <Markdown className="text-lg py-0 md:pb-6">
                  {data.attributes.description}
                </Markdown>
              )}
              {data.attributes.work_experience && (
                <div className="py-4">
                  <h4 className="spectral sc text-xl pb-2 border-b border-black">
                    Work Experience
                  </h4>
                  <Markdown className="text-lg py-4">
                    {data.attributes.work_experience}
                  </Markdown>
                </div>
              )}
              {data.attributes.education && (
                <div className="py-4">
                  <h4 className="spectral sc text-xl pb-2 border-b border-black">
                    Education
                  </h4>
                  <Markdown className="text-lg py-4">
                    {data.attributes.education}
                  </Markdown>
                </div>
              )}
              {data.attributes.affiliations_and_memberships && (
                <div className="py-4">
                  <h4 className="spectral sc text-xl pb-2 border-b border-black">
                    Affiliations and Memberships
                  </h4>
                  <Markdown className="text-lg py-4">
                    {data.attributes.affiliations_and_memberships}
                  </Markdown>
                </div>
              )}
              {data.attributes.practice_areas && (
                <div className="py-4">
                  <h4 className="spectral sc text-xl pb-2 border-b border-black">
                    Practice Areas
                  </h4>
                  <ul className="list-disc pl-5 p-5 text-lg">
                    {data.attributes.practice_areas.data.map(
                      (practiceArea: any, index: number) => (
                        <li key={index}>
                          <a
                            href={`/services/${practiceArea.attributes.slug}`}
                            className="hover:underline"
                          >
                            {practiceArea.attributes.name}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </section>
          </main>
        </div>
      </article>
      <InquiryBanner />
    </>
  );
}
