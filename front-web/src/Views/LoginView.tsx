import metamask from "../Assets/metamask.svg.png";
import { useEffect, useRef } from "react";
import {GetAccountFromProvider} from "aleph-sdk-ts/dist/accounts/ethereum";
async function ConnectToWallet() {
  const provider = window.ethereum;
  const account = await GetAccountFromProvider(provider)
}
const LoginView = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const loginRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (loginRef.current && !loginRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={
        "w-full h-screen bg-backgroundRgba fixed z-10 flex items-center justify-center"
      }
    >
      <div
        ref={loginRef}
        className={
          "w-[20vw] h-1/2 bg-background border-button border rounded-lg p-4"
        }
      >
        <h1 className={"text-headline font-poppinsBold text-xl"}>
          Connect to your wallet
        </h1>
        <ul className={"mt-5"}>
          <button
            className={
              "h-16 w-full text-button hover:text-[#f68614] text-lg font-poppinsSemiBold rounded-lg border hover:border-[#f68614] border-button duration-300 transition-all flex items-center"
            }
          >
            <img src={metamask} className={"object-scale-down h-16"} />
            Metamask
          </button>
        </ul>
      </div>
    </div>
  );
};

export default LoginView;
