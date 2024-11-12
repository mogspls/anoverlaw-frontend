import { InquiryBanner } from "@/components/Banner";
import { fetchData } from "@/hooks/strapi-fetch";

interface Post {
  id: number;
  attributes: PostAttributes;
}

interface PostAttributes {
  name: string;
  slug: string;
}

export default async function Services() {
  const posts = await fetchData("/practice-areas");

  return (
    <>
      <header
        className="h-56 lg:h-80 bg-center bg-cover flex items-end justify-start"
        style={{ backgroundImage: "url(/images/services.jpg)" }}
      >
        <div className="mx-auto max-w-screen-xl w-full px-4">
          <div className="flex flex-col gap-6 pb-6 lg:pb-12">
            <h4 className="font-bold text-white">PRACTICE AREAS</h4>
            <h1 className="text-5xl text-white spectral lg:text-6xl">
              Our Services
            </h1>
          </div>
        </div>
      </header>
      <main className="bg-white py-0 pb-12 lg:py-12 text-lg">
        <div id="container" className="mx-auto max-w-screen-xl w-full px-4">
          <section className="py-12">
            <p>
              A&ntilde;over A&ntilde;over San Diego & Primavera Law Offices has
              grown into a full service firm built on its commitment to provide
              competent legal service to its client-partners.
            </p>
            <p>
              The diverse background and professional training of its team
              enables the firm to provide innovative yet precise and ethical
              solutions to their clients’ legal problems. Preventive conflict
              management remains a core value of the organization.{" "}
              <span className="font-bold"> Our practice areas include:</span>
            </p>
          </section>
          <section className="grid grid-cols-2 lg:grid-cols-3 gap-1">
            {posts.data.map((post: Post, key: number) => (
              // <a
              //   href={`/services/${post.attributes.slug}`}
              //   className="flex justify-between w-full hover:bg-[#1B387D] duration-75 bg-black p-4 text-white items-end h-56"
              //   key={key}
              // >
              //   <h2 className="text-sm lg:text-lg">{post.attributes.name}</h2>
              //   <svg
              //     width="24"
              //     height="24"
              //     viewBox="0 0 1000 1000"
              //     xmlns="http://www.w3.org/2000/svg"
              //     fill="#fff"
              //   >
              //     <path
              //       d=" M 165 565C 165 565 465 265 465 265C 484 245 516 245 535 265C 535 265 835 565 835 565C 855 584 856 616 836 636C 816 656 784 655 765 635C 765 635 500 371 500 371C 500 371 235 635 235 635C 221 650 200 655 181 647C 162 639 150 621 150 601C 150 587 155 574 165 565C 165 565 165 565 165 565"
              //       transform="rotate(90,500,500)"
              //     />
              //   </svg>
              // </a>

              <li key={key} className="py-4 px-2 ml-4">
                <a
                  href={`/services/${post.attributes.slug}`}
                  className="hover:underline spectral sc"
                  key={key}
                >
                  {post.attributes.name}
                </a>
              </li>
            ))}
          </section>
        </div>
      </main>
      <InquiryBanner />
    </>
  );
}
