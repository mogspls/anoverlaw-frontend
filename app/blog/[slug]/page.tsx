import Markdown from "react-markdown";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { InquiryBanner } from "@/components/Banner";

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] };
};

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
async function getPostBySlug(slug: string) {
  const res = await fetch(
    `${BASE_URL}/api/blogposts?filters[slug][$eq]=${slug}&populate=*`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await fetch(
    `${BASE_URL}/api/blogposts?filters[slug][$eq]=${params.slug}&populate=category`
  ).then((res) => res.json());

  const title = response.data[0]?.attributes.title;
  const description = response.data[0]?.attributes.description;

  return {
    title: `${title} | ${response.data[0]?.attributes.category?.data.attributes.title} | Añover Añover San Diego & Primavera Law Offices`,
    description: `${description}`,
  };
}

export default async function blogpost({
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
    <>
      <header className="flex flex-col gap-8 pt-12 bg-white">
        <h6 className="text-center opensans font-bold text-black after:contents-[''] after:block after:h-1 after:bg-black after:translate-y-4 after:w-4 after:text-center flex items-center flex-col text-sm lg:text-lg uppercase">
          {post.attributes.category.data.attributes.title}
        </h6>
        <h1 className="spectral sc text-black text-4xl lg:text-5xl w-full max-w-screen-sm text-center mx-auto leading-none">
          {post.attributes.title}
        </h1>
        <img
          src={post.attributes.banner.data.attributes.url}
          alt={post.attributes.title}
          className="w-full h-96 md:h-auto md:aspect-[2.5/1] object-cover"
        />
      </header>
      <article className="bg-white blog-post">
        <div className="max-w-screen-md py-12 mx-auto w-full text-xl">
          <Markdown className="prose">{post.attributes.body}</Markdown>
        </div>
      </article>
      <InquiryBanner/>
    </>
  );
}
