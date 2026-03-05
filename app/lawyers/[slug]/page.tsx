import { InquiryBanner } from "@/components/Banner";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { fetchData } from "@/hooks/strapi-fetch";

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] };
};

async function getLawyerBySlug(slug: string) {
  // Populate only what this page uses
  return fetchData(
    `/lawyers?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate[0]=profile_picture&populate[1]=position&populate[2]=practice_areas`
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await fetchData(
    `/lawyers?filters[slug][$eq]=${encodeURIComponent(
      params.slug
    )}&populate[0]=position`
  );

  const item = response?.data?.[0];

  if (!item?.attributes) {
    return {
      title: "Lawyer not found | Añover Añover San Diego & Primavera Law Offices",
      robots: { index: false },
    };
  }

  const attrs = item.attributes;
  const title = attrs?.name ?? "Lawyer";
  const description = attrs?.description ?? "";
  const position = attrs?.position?.data?.attributes?.title ?? "";

  return {
    title: `${title}${position ? ` — ${position}` : ""} | Añover Añover San Diego & Primavera Law Offices`,
    description,
  };
}

export default async function LawyerPage({ params }: { params: { slug: string } }) {
  const response = await getLawyerBySlug(params.slug);

  const item = response?.data?.[0];
  if (!item?.attributes) notFound();

  const data = item; // v4: { id, attributes }
  const attrs = data.attributes;

  const practiceAreas = attrs?.practice_areas?.data ?? [];

  return (
    <>
      <article id={attrs.slug} className="lawyer bg-white md:py-24">
        <div className="mx-auto max-w-screen-xl w-full flex flex-col md:flex-row md:px-4">
          <aside>
            <div className="w-full max-w-full md:max-w-96 md:sticky md:top-24">
              <div className="flex flex-col md:flex-col gap-6">
                {attrs?.profile_picture?.data?.attributes?.url ? (
                  <img
                    src={attrs.profile_picture.data.attributes.url}
                    alt={attrs.name}
                    className="object-cover aspect-[9/12] object-top w-full"
                  />
                ) : null}
              </div>

              <header className="flex flex-col gap-2">
                <div
                  className={`p-6 px-4 md:px-0 after:block after:bottom-0 ${
                    attrs.description
                      ? "after:absolute relative md:after:hidden after:contents-[''] after:h-[2px] after:w-12 after:bg-black"
                      : ""
                  }`}
                >
                  <h4 className="uppercase text-lg md:text-lg font-bold">
                    {attrs?.position?.data?.attributes?.title ?? ""}
                  </h4>

                  <h1 className="spectral sc text-3xl md:text-2xl">
                    {attrs.name}
                  </h1>

                  {attrs?.email ? (
                    <a
                      href={`mailto:${attrs.email}`}
                      className="hover:underline text-lg"
                    >
                      {attrs.email}
                    </a>
                  ) : null}
                </div>
              </header>
            </div>
          </aside>

          <main className="w-full pt-4 px-4 md:px-12 md:pt-0">
            <section>
              {attrs?.description ? (
                <Markdown className="text-lg py-0 pb-6 ">
                  {attrs.description}
                </Markdown>
              ) : null}

              {attrs?.work_experience ? (
                <div className="py-4">
                  <h4 className="spectral sc text-xl pb-2 border-b border-black">
                    Work Experience
                  </h4>
                  <Markdown className="text-lg py-4">
                    {attrs.work_experience}
                  </Markdown>
                </div>
              ) : null}

              {attrs?.education ? (
                <div className="py-4">
                  <h4 className="spectral sc text-xl pb-2 border-b border-black">
                    Education
                  </h4>
                  <Markdown className="text-lg py-4">{attrs.education}</Markdown>
                </div>
              ) : null}

              {attrs?.affiliations_and_memberships ? (
                <div className="py-4">
                  <h4 className="spectral sc text-xl pb-2 border-b border-black">
                    Affiliations and Memberships
                  </h4>
                  <Markdown className="text-lg py-4">
                    {attrs.affiliations_and_memberships}
                  </Markdown>
                </div>
              ) : null}

              {attrs?.practice_areas && practiceAreas.length > 0 ? (
                <div className="py-4">
                  <h4 className="spectral sc text-xl pb-2 border-b border-black">
                    Practice Areas
                  </h4>
                  <ul className="list-disc pl-5 p-5 text-lg">
                    {practiceAreas.map((practiceArea: any, index: number) => (
                      <li key={index}>
                        <a
                          href={`/services/${practiceArea.attributes?.slug}`}
                          className="hover:underline"
                        >
                          {practiceArea.attributes?.name ?? ""}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          </main>
        </div>
      </article>

      <InquiryBanner />
    </>
  );
}