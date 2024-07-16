interface BannerProps {
  subtitle?: string;
  title: string;
  anchor?: string;
  href?: string;
  backgroundImage?: string;
  backgroundColor?: string;
}

export default function Banner({
  title,
  subtitle,
  anchor,
  href,
  backgroundImage,
  backgroundColor
}: BannerProps) {
  return (
    <section
      className="min-h-96 h-full py-12 bg-center bg-cover text-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "",
        backgroundColor: backgroundColor ? backgroundColor : "#0C0E11"
      }}
    >
      <div className="max-w-screen-xl mx-auto flex items-center flex-col gap-12 px-2">
        {subtitle && (
          <h6 className="text-white opensans font-bold">{subtitle}</h6>
        )}
        <hr className="border border-white w-12" />
        <h2 className="spectral text-white text-xl lg:text-4xl">{title}</h2>
        {anchor && href && (
          <div className="h-full flex">
            <a href={href} className="px-12 py-4 text-white bg-[#1B387D]">
              {anchor}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
