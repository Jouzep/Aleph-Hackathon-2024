import { FaSpaceAwesome } from "react-icons/fa6";
import { ReactTyped } from "react-typed";
import snkrs1 from "../Assets/homeviewassets/snkrs2.png";
import wine from "../Assets/homeviewassets/wine.png";
import ticket from "../Assets/homeviewassets/taylorswift.png";
import { useNavigate } from "react-router-dom";
import LoginView from "../Views/LoginView";
import { useState } from "react";
const HomeIntro = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={
        "w-full h-full flex items-center relative justify-center overflow-hidden"
      }
    >
      <div className={`${isOpen ? "block w-full h-full absolute" : "hidden"}`}>
        <LoginView isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <img
        src={snkrs1}
        className={"w-[40vw] absolute -top-[15vh] -right-[20vw] -rotate-45"}
        alt={"snkrs"}
      />
      <img
        src={wine}
        className={"w-[30vw] absolute -left-[10vw] rotate-45"}
        alt={"wine"}
      />
      <img
        src={ticket}
        className={"w-[30vw] absolute bottom-24 -right-[10vw] rotate-45"}
        alt={"ticket1"}
      />
      <img
        src={ticket}
        className={"w-[30vw] absolute bottom-0 -right-[10vw] rotate-2"}
        alt={"ticket2"}
      />
      <main
        className={
          "h-full w-full flex justify-center items-center flex-col gap-10"
        }
      >
        <h1
          className={
            "text-6xl flex items-center text-headline font-poppinsBold"
          }
        >
          <FaSpaceAwesome className={"rotate-45"} />
          DeStock
        </h1>
        <span>
          <h1 className={"text-headline text-5xl font-poppinsBold"}>
            De
            <ReactTyped
              strings={["Stock", "centralised Stock"]}
              loop
              typeSpeed={40}
              backSpeed={50}
            />
          </h1>
          <h2 className={"text-xl font-poppinsSemiBold text-text"}>
            We take care of your stock no matter who you are
          </h2>
        </span>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className={
            "bg-button text-lg font-poppinsSemiBold text-headline p-4 rounded-lg hover:bg-buttonhover"
          }
        >
          Get started
        </button>
      </main>
    </div>
  );
};

export default HomeIntro;
