import Markdown from "react-markdown";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { InquiryBanner } from "@/components/Banner";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

// interface PracticeAreaAttributes {
//   name?: string;
//   slug?: string;
//   description?: string;
//   createdAt?: string;
//   updatedAt?: string;
//   lawyers?: LawyerAttributes;
// }

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
    position: {
      data: {
        attributes: {
          slug: string;
          title: string;
        };
      };
    };
  };
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
    `${BASE_URL}/api/practice-areas?filters[slug][$eq]=${params.slug}`
  ).then((res) => res.json());

  const title = response.data[0].attributes.name;
  const description = response.data[0].attributes.description;

  return {
    title: `Services | ${title} | Añover Añover San Diego & Primavera Law Offices`,
    description: `${description}`,
  };
}

async function getPostBySlug(slug: string) {
  const res = await fetch(
    `${BASE_URL}/api/practice-areas?filters[slug][$eq]=${slug}&populate[lawyers][populate]=*`,
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
        <div className="mx-auto max-w-screen-xl w-full px-4">
          <div className="flex flex-col gap-6 pb-6 lg:pb-12">
            <h4 className="font-bold text-white">SERVICES</h4>
            <h1 className="text-5xl text-white spectral lg:text-6xl">
              {post?.attributes.name}
            </h1>
          </div>
        </div>
      </header>
      <main id="service" className="bg-white py-12 lg:py-12 text-lg">
        <div id="container" className="mx-auto max-w-screen-xl w-full px-4">
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
