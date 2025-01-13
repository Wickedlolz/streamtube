import Link from "next/link";
import Image from "next/image";

const infoLinks = [
  { title: "About us", href: "/about" },
  { title: "Contact us", href: "/contact" },
  { title: "Terms & Conditions", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy" },
];

const FooterLinks = ({
  items,
}: {
  items: { title: string; href: string }[];
}) => (
  <div className="flex flex-col text-gray-300">
    {items.map((item) => (
      <Link
        href={item.href}
        key={item.title}
        className="hover:text-white text-sm mb-1 cursor-pointer duration-200 border-b border-b-[#222] py-1 flex items-center gap-x-3 group"
      >
        <span className="w-2 h-2 rounded-full inline-flex border border-red-700 group-hover:bg-red-700 duration-200" />
        {item.title}
      </Link>
    ))}
  </div>
);

const FooterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h2 className="text-base uppercase font-bold text-white tracking-wide border-b border-b-gray-600 py-2 mb-5 relative">
      {title}
      <span className="w-16 h-1 bg-red-600 inline-block absolute left-0 -bottom-[1.5px] z-10" />
    </h2>
    {children}
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-[#191919] px-10 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <FooterSection title="About us">
        <Link href="/">
          <Image
            src="https://i.ibb.co/ZW0SbjJ/logo-dark.png"
            alt="Logo"
            width={120}
            height={100}
            className="cursor-pointer w-40 h-auto"
          />
        </Link>
        <p className="text-gray-200 text-sm leading-6 tracking-wide mt-5 max-w-72">
          Welcome to StreamTube, your ultimate destination for movie lovers! Our
          app is designed to bring the magic of cinema right to your fingertips.
        </p>
      </FooterSection>

      <FooterSection title="Information">
        <FooterLinks items={infoLinks} />
      </FooterSection>

      <FooterSection title="Connect with Us">
        <div className="text-gray-300 text-sm flex flex-col gap-2">
          <p>
            Phone: <span className="text-white font-medium">001 7728 3369</span>
          </p>
          <p>
            Email:{" "}
            <span className="text-white font-medium">test@gmail.com</span>
          </p>
        </div>
      </FooterSection>
    </footer>
  );
};

export default Footer;
