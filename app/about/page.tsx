import type { Metadata } from "next";
// import SimpleParallax from "simple-parallax-js";

export const metadata: Metadata = {
  title: "About — Añover Añover San Diego & Primavera Law Offices",
  description:
    "Añover Añover San Diego & Primavera Law Offices is a full service law firm that delivers high quality and specialized legal services to a wide array of clients. Founded in 2010 by law practitioners with collective experience gained from prestigious law firms, respected corporations and government offices, it has grown further in its practice throughout the years with the assurance that its services remain unparalleled and exceptional. Concurrently, the relationships it has built with its clients continue to be marked with sterling communication and genuine interaction while dynamically adapting to each of their legal needs.",
};

export default function About() {
  return (
    <article>
      <header id="about-header" className="flex flex-col gap-8 pt-12 bg-white">
        <h6 className="text-center opensans font-bold text-black after:contents-[''] after:block after:h-1 after:bg-black after:translate-y-4 after:w-4 after:text-center flex items-center flex-col text-sm lg:text-lg">
          ABOUT US
        </h6>
        <h1 className="spectral sc text-black text-4xl lg:text-5xl text-center leading-none">
          Full-service <br />
          Complete disclosure <br />
          Solution focused <br />
          Strategic lawyering
        </h1>
        <img
          src={"/images/home/generative-expand-aasp-partners.jpg"}
          alt="AASP Lawyers"
          className="w-full hidden md:block"
        />
        <img
          src={"/images/home/aasp-partners.jpg"}
          alt="AASP Lawyers"
          className="w-full block md:hidden"
        />
      </header>
      <main className="bg-white pb-24 spectral text-xl">
        <div className="mx-auto max-w-screen-md py-4 md:py-12 px-4 bg-white">
          <p>
            Añover Añover San Diego & Primavera Law Offices is a full service
            law firm that delivers high quality and specialized legal services
            to a wide array of clients. Founded in 2010 by law practitioners
            with collective experience gained from prestigious law firms,
            respected corporations and government offices, it has grown further
            in its practice throughout the years with the assurance that its
            services remain unparalleled and exceptional.{" "}
          </p>
          <p>
            Concurrently, the relationships it has built with its clients
            continue to be marked with sterling communication and genuine
            interaction while dynamically adapting to each of their legal needs.
          </p>
        </div>
        <img
          src={"/images/home/aasp-lawyers-enhanced.png"}
          alt="AASP Partners"
          className="w-full block mx-auto max-w-screen-md"
        />
        <div className="mx-auto max-w-screen-md py-4 md:py-12 px-4 bg-white">
          <p>
            The Firm&quot;s clientele not only consists of private individuals but
            also of businesses ranging from startups to multinational companies
            and cuts across different industries such as, but not limited to,
            manufacturing, export, manpower, technology, education, health and
            energy.
          </p>
          <p>
            With its team of competent and adept lawyers, the Firm ensures that
            the legal services and representation it gives its clients spanning,
            among others, from litigation and dispute resolution, labor and
            employment, corporate practice, intellectual property, immigration,
            and family law, continue to be transparent, personalized, effective
            and comprehensive.
          </p>
        </div>
        <img
          src={"/images/home/partners-and-counsel.jpg"}
          alt="AASP Partners"
          className="w-full block mx-auto max-w-screen-md"
        />
        <div className="mx-auto max-w-screen-md py-4 md:py-12 px-4 bg-white">
          <p>
            We are law practitioners with a collective experience spanning over
            75 years, acquired from esteemed law firms, multinational
            conglomerates, respected corporations, and government offices.{" "}
          </p>
          <p>
            Our extensive experience, energy, and dynamism provide a steadfast
            assurance that we offer transparent, personalized, and
            cost-efficient services to our clients.{" "}
          </p>
          <p>
            We strive to not only meet but surpass our clients’ expectations as
            a standard practice. It is our ardent desire to go above and beyond
            in fulfilling our clients&rsquo; needs. We are prepared to devise
            innovative and ethical approaches in specialized areas of practice
            to facilitate preventive conflict management. This approach often
            proves to be the most economical and effective means of resolving
            conflicts.
          </p>
          <p>
            As advocates of justice and fairness, prudence, fortitude, and
            temperance guide our practice of the legal profession.
          </p>
          <p>
            The Firm is supported by a cohesive group of non-legal staff,
            comprising polite office assistants, an alert and responsive
            messenger service team, and trustworthy accounting personnel. These
            dedicated individuals ensure professional office upkeep, catering to
            the needs and requirements of our clients at all times
          </p>
        </div>
      </main>
    </article>
  );
}
