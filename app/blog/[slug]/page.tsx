import Markdown from "react-markdown";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InquiryBanner } from "@/components/Banner";
import { fetchData } from "@/hooks/strapi-fetch";

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] };
};

function unwrap<T extends Record<string, any>>(entity: any): T {
  return (entity?.attributes ?? entity) as T;
}

function unwrapRel(rel: any): any | null {
  if (!rel) return null;
  if (rel?.data) return unwrap(rel.data);
  return unwrap(rel);
}

function mediaUrl(media: any): string | null {
  const v4 = media?.data?.attributes?.url;
  if (typeof v4 === "string" && v4.length) return v4;

  const v5a = media?.url;
  if (typeof v5a === "string" && v5a.length) return v5a;

  const v5b = media?.data?.url;
  if (typeof v5b === "string" && v5b.length) return v5b;

  return null;
}

async function getPostBySlug(slug: string) {
  return fetchData(
    `/blogposts?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate[0]=category&populate[1]=banner`
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetchData(
    `/blogposts?filters[slug][$eq]=${encodeURIComponent(
      params.slug
    )}&populate[0]=category`
  );

  const first = res?.data?.[0];
  if (!first) {
    return {
      title: "Blog | Añover Añover San Diego & Primavera Law Offices",
      robots: { index: false },
    };
  }

  const post = unwrap<any>(first);
  const category = unwrapRel(post.category);

  const title = post?.title ?? "Blog";
  const description = post?.description ?? "";
  const categoryTitle = category?.title ?? "";

  return {
    title: `${title}${categoryTitle ? ` | ${categoryTitle}` : ""} | Añover Añover San Diego & Primavera Law Offices`,
    description,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const response = await getPostBySlug(params.slug);

  const first = response?.data?.[0];
  if (!first) notFound();

  const post = unwrap<any>(first);
  const category = unwrapRel(post.category);

  const banner = post.banner;
  const bannerSrc = mediaUrl(banner);

  return (
    <>
      <header className="flex flex-col gap-8 pt-12 bg-white">
        <h6 className="text-center opensans font-bold text-black after:contents-[''] after:block after:h-1 after:bg-black after:translate-y-4 after:w-4 after:text-center flex items-center flex-col text-sm lg:text-lg uppercase">
          {category?.title ?? "Blog"}
        </h6>

        <h1 className="spectral sc text-black text-4xl lg:text-5xl w-full max-w-screen-sm text-center mx-auto leading-none">
          {post.title}
        </h1>

        {bannerSrc ? (
          <img
            src={bannerSrc}
            alt={post.title ?? "Blog post"}
            className="w-full h-96 md:h-auto md:aspect-[2.5/1] object-cover"
          />
        ) : null}
      </header>

      <article className="bg-white blog-post">
        <div className="max-w-screen-md py-12 mx-auto w-full text-xl">
          <Markdown className="text-slate-800 leading-10 [&>ul]:list-disc [&>ul]:ml-12 [&>ul]:py-12 [&>a]:!underline [&>a]:!text-[#1B387D]">
            {post.body ?? ""}
          </Markdown>
        </div>
      </article>

      <InquiryBanner />
    </>
  );
}
