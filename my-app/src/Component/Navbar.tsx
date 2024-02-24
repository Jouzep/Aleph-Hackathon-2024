import { SectionId } from "../Interface/SectionId";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaSpaceAwesome } from "react-icons/fa6";

const NavItems = [
  {
    text: "Home",
    to: SectionId.Home,
  },
  {
    text: "About",
    to: SectionId.About,
  },
  {
    text: "Price",
    to: SectionId.Projects,
  },
];

const Navbar = () => {
  const mappedItems = NavItems.map(({ to, text }) => {
    return (
      <AnchorLink
        key={text}
        href={`#${to}`}
        offset="70px"
        className={`font-bold ${text === "Estimer" ? "text-dark-red" : ""}`}
      >
        {text}
      </AnchorLink>
    );
  });

  return (
    <nav
      className={
        "w-[80%] h-[7vh] bg-navbar fixed rounded-2xl backdrop-blur mix-blend-difference top-5 flex justify-between items-center px-5 z-10"
      }
    >
      <AnchorLink href={`#${SectionId.Home}`} offset="70px">
        <FaSpaceAwesome className={"rotate-45 text-3xl"} />
      </AnchorLink>
      <section className={"flex gap-10"}>{mappedItems}</section>
    </nav>
  );
};

export default Navbar;
