import { InquiryBanner } from "@/components/Banner";
import { fetchData } from "@/hooks/strapi-fetch";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Lawyer {
  id: number;
  attributes: LawyerAttributes;
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
        slug: string;
        title: string;
      };
    };
  };
  createdAt: string;
}

export const metadata: Metadata = {
  title:
    "Senior Counsel and Consultants — Añover Añover San Diego & Primavera Law Offices",
  description:
    "We are law practitioners with a collective experience spanning over 75 years, acquired from esteemed law firms, multinational conglomerates, respected corporations, and government offices. Our extensive experience, energy, and dynamism provide a steadfast assurance that we offer transparent, personalized, and cost-efficient services to our clients.",
};

export default async function Lawyers() {
  const req = await fetchData(
    `/lawyers?populate=position,profile_picture&pagination[pageSize]=100`
  );
  const response = await req.data;

  if (req?.meta.pagination.total == 0) {
    notFound();
  }

  const data = response.sort(
    (a: any, b: any) =>
      new Date(a.attributes.createdAt).getTime() -
      new Date(b.attributes.createdAt).getTime()
  );

  const filteredLawyers = data.filter((lawyer: any) => {
    const positionSlug = lawyer.attributes.position?.data?.attributes?.slug;
    return positionSlug === "senior-counsel" || positionSlug === "consultants";
  });

  return (
    <>
      <header
        className="h-56 lg:h-80 bg-center bg-cover flex items-end justify-start"
        style={{ backgroundImage: "url(/images/services.jpg)" }}
      >
        <div className="mx-auto max-w-screen-xl w-full px-4">
          <div className="flex flex-col gap-6 pb-6 lg:pb-12">
            <h4 className="font-bold text-white">MEET THE CONSULTANTS</h4>
            <h1 className="text-5xl text-white spectral lg:text-6xl">
              Senior Counsel &amp; Consultants
            </h1>
          </div>
        </div>
      </header>
      <main className="bg-white">
        <div className="mx-auto max-w-screen-xl w-full px-4">
          {/* <section className="py-12">
            <p>
              We are law practitioners with a collective experience spanning
              over 75 years, acquired from esteemed law firms, multinational
              conglomerates, respected corporations, and government offices. Our
              extensive experience, energy, and dynamism provide a steadfast
              assurance that we offer transparent, personalized, and
              cost-efficient services to our clients.
            </p>
          </section> */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12 pt-12 pb-56">
            {filteredLawyers.map((lawyer: Lawyer, index: number) => {
              return (
                <div key={index}>
                  <a href={`/lawyers/${lawyer.attributes.slug}`}>
                    <img
                      src={`${lawyer.attributes.profile_picture.data.attributes.url}`}
                      alt={lawyer.attributes.name}
                      className="flex object-cover object-top aspect-[9/12]"
                    />
                  </a>
                  <div className="py-4">
                    <h4 className="font-bold">
                      <a
                        href={`/lawyers/${
                          lawyer.attributes.position.data.attributes.slug ===
                          "founding-partner"
                            ? "partners"
                            : lawyer.attributes.position.data.attributes
                                .slug === "partner"
                            ? "partners"
                            : lawyer.attributes.position.data.attributes
                                .slug === "senior-associates"
                            ? "associates"
                            : lawyer.attributes.position.data.attributes
                                .slug === "associate"
                            ? "associates"
                            : lawyer.attributes.position.data.attributes
                                .slug === "consultants"
                            ? "senior-counsel-and-consultants"
                            : lawyer.attributes.position.data.attributes
                                .slug === "consultant"
                            ? "senior-counsel-and-consultants"
                            : lawyer.attributes.position.data.attributes
                                .slug === "senior-counsel"
                            ? "senior-counsel-and-consultants"
                            : lawyer.attributes.position.data.attributes.slug
                        }`}
                        className="font-bold uppercase text-xs hover:underline"
                      >
                        {lawyer.attributes.position.data.attributes.title}
                      </a>
                    </h4>
                    <h1 className="spectral sc text-2xl">
                      <a
                        href={`/lawyers/${lawyer.attributes.slug}`}
                        className="hover:underline"
                      >
                        {lawyer.attributes.name}
                      </a>
                    </h1>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </main>
      <InquiryBanner />
    </>
  );
}
