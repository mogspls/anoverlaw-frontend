import Markdown from "react-markdown";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { InquiryBanner } from "@/components/Banner";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

interface PracticeArea {
  meta: {
    pagination: {
      total: number;
    };
  };
  data: {
    id?: number;
    attributes?: PracticeAreaAttributes;
  };
}

interface PracticeAreaAttributes {
  name?: string;
  slug?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  lawyers?: LawyerAttributes;
}

interface LawyerAttributes {
  attributes: {
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
  };
}

export async function generateMetadata(slug: string): Promise<Metadata> {
  const response = await getPostBySlug(slug);
  console.log(response);

  return {
    title: ``,
    description: ``,
  };
}

async function getPostBySlug(slug: string) {
  const res = await fetch(
    `${BASE_URL}/api/practice-areas?filters[slug][$eq]=${slug}&populate[lawyers][populate]=profile_picture`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return res.json();
}

export default async function PracticeArea({
  params,
}: {
  params: { slug: string };
}) {
  const response = await getPostBySlug(params.slug);

  if (response?.meta.pagination.total == 0) {
    notFound();
  }
  const post = response.data[0];

  return (
    <article>
      <header
        className="h-72 lg:h-80 bg-center bg-cover flex items-end justify-start"
        style={{ backgroundImage: "url(/images/services.jpg)" }}
      >
        <div className="mx-auto max-w-screen-2xl w-full px-4">
          <div className="flex flex-col gap-6 pb-6 lg:pb-12">
            <h4 className="font-bold text-white">SERVICES</h4>
            <h1 className="text-5xl text-white spectral lg:text-6xl">
              {post?.attributes.name}
            </h1>
          </div>
        </div>
      </header>
      <main className="bg-white py-0 pb-12 lg:py-12 text-lg">
        <div id="container" className="mx-auto max-w-screen-2xl w-full px-4">
          <section className="">
            <Markdown>{post?.attributes.description}</Markdown>
          </section>
          {post?.attributes.lawyers.data.length !== 0 ? (
            <>
              <h1 className="spectral sc text-3xl before:h-1 before:contents-[''] before:bg-black before:block before:-translate-y-4 pt-8 before:w-12 ">
                Lawyers Specializing in {post?.attributes.name}
              </h1>
              <section className="grid grid-cols-2 lg:grid-cols-6 gap-1 py-12">
                {post?.attributes.lawyers.data.map(
                  (lawyer: LawyerAttributes, key: number) => (
                    <article>
                      <a
                        href={`/lawyers/${lawyer.attributes.slug}`}
                        className="flex w-full duration-75 flex-col text-black"
                        key={key}
                      >
                        <img
                          src={
                            lawyer.attributes.profile_picture.data.attributes
                              .url
                          }
                          alt={
                            lawyer.attributes.name
                          }
                        />
                        {/* <h2>{}</h2> */}
                        <h2 className="text-4xl lg:text-xl spectral sc py-4">
                          {lawyer.attributes.name}
                        </h2>
                      </a>
                    </article>
                  )
                )}
              </section>
            </>
          ) : (
            <div>No one seems to be handling this. Kindly check back!</div>
          )}
        </div>
      </main>
      <InquiryBanner />
    </article>
  );
}
