import { FaSpaceAwesome } from "react-icons/fa6";
import ConnectButton from "../context/Context";
import { useAccount, useDisconnect } from "wagmi";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Navbar = () => {
  const disconnect = useDisconnect();
  const [active, setActive] = useState("Dashboard");
  const { address, isConnecting, isDisconnected } = useAccount();
  const navigate = useNavigate();

  if (isDisconnected) {
    navigate("/");
  }
  return (
    <div className={"w-full h-screen overflow-hidden flex"}>
      <nav
        className={
          "w-[20%] h-full bg-background drop-shadow flex flex-col items-center justify-evenly"
        }
      >
        <header
          className={"w-full h-[10%] flex px-5 justify-center items-center"}
        >
          <a href={"/"}>
            <FaSpaceAwesome className={"rotate-45 text-5xl text-white mb-3"} />
          </a>
          <div className={"select-none cursor-none"}>
            <ConnectButton />
          </div>
        </header>
        <ul
          className={
            "text-xl h-[80%] font-poppinsMedium active:text-button w-[70%] flex flex-col gap-5"
          }
        >
          <li>
            <button
              onClick={() => {
                setActive("Dashboard");
                navigate("/dashboard");
              }}
              className={`${active === "Dashboard" ? "text-button" : "text-text"}`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActive("Inventory");
                navigate("/inventory");
              }}
              className={`${active === "Inventory" ? "text-button" : "text-text"}`}
            >
              Inventory
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActive("Public");
                navigate("/public");
              }}
              className={`${active === "Public" ? "text-button" : "text-text"}`}
            >
              Public
            </button>
          </li>
        </ul>
        <button
          onClick={() => disconnect}
          className={
            "text-headline bg-button hover:bg-buttonhover text-xl font-poppinsSemiBold p-3 rounded-lg"
          }
        >
          Disconnect
        </button>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
