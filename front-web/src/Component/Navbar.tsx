import { SectionId } from "../Interface/SectionId";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaSpaceAwesome } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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

  console.log(localStorage.getItem("isLogin"));

  return (
    <nav
      className={
        "w-[80%] h-[7vh] bg-navbar fixed rounded-2xl backdrop-blur-xl mix-blend-difference top-5 flex justify-between items-center px-5 z-10"
      }
    >
      <span className={"flex items-center gap-5"}>
        <AnchorLink href={`#${SectionId.Home}`} offset="70px">
          <FaSpaceAwesome className={"rotate-45 text-3xl"} />
        </AnchorLink>
        <button
          onClick={() => navigate("/dashboard")}
          className={
            "bg-button text-xl font-poppinsBold p-3 text-headline rounded-lg"
          }
        >
          Dashboard
        </button>
      </span>
      <section className={"flex gap-10"}>{mappedItems}</section>
    </nav>
  );
};

export default Navbar;
