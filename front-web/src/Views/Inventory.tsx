import { DefaultViewLoginTemplate } from "../Component/DefaultViewTemplate";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import "../Style/Input.css";
import { useSignMessage } from "wagmi";
import {
  addProductToDictionary,
  createDictionary,
  deleteDict,
  getDictionary,
  getDictionaryProduct,
} from "../API/Dictionary";
import { product } from "../Interface/Product";
import { CreateGroup, getGroupList } from "../API/Group";
import { FaCheck } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface Product {
  [key: string]: {
    name: string;
    owner: string;
    private: boolean;
    presetProducts: product[];
  };
}

interface Group {
  name: string;
  owner: string;
  products: string[]; // ou tout autre type approprié pour les produits
  authorized: string[];
}

interface GroupData {
  active: Group[];
  inactive: Group[];
}

const Inventory = () => {
  const { data, isError, isSuccess, signMessage } = useSignMessage();
  const [isOpenG, setIsOpenG] = useState(false);
  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const GroupName = useRef("");
  const DicoRef = useRef("");
  const [dict, setDict] = useState<Product>({}); // Utilisez le bon nom de type ici
  const [dicoInfo, setDicoInfo] = useState("");
  const [Groups, setGroups] = useState<GroupData>();

  const [isOpenD, setIsOpenD] = useState(false);
  const formRefD = useRef<HTMLFormElement>(null);

  const onSubmitD = async (
    e: React.FormEvent<HTMLFormElement>,
    dico: string,
  ) => {
    e.preventDefault();
    const formData = new FormData(formRefD.current!);
    const name = (formData.get("Product name") as string) || "";
    const price = parseInt(formData.get("price") as string) || 0;
    const size = [(formData.get("size") as string) || ""];
    const state = (formData.get("state") as string) || "";
    const img = (formData.get("image") as string) || "";
    const unit = (formData.get("unit") as string) || "";

    const response = await addProductToDictionary({
      dico,
      name,
      unit,
      size,
      price,
      img,
    });
    console.log(response);
    handleDictionary();
  };

  const onSubmitGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(GroupName.current);
    const response = await CreateGroup(GroupName.current);
    console.log(response);
    GroupName.current = "";
    setIsOpenGroup(false);
    handleGroup();
  };

  const handleGroup = async () => {
    const response = await getGroupList(localStorage.getItem("address") || "");
    const formattedGroups: GroupData = {
      active: response.active || [],
      inactive: response.inactive || [],
    };
    setGroups(formattedGroups);
    console.log(Groups);
  };

  const onSubmitDico = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createDictionary({
      name: DicoRef.current,
      address: localStorage.getItem("address") || "",
      isPriv: true,
    });
    console.log(response);
    GroupName.current = "";
    handleDictionary();
  };

  const getDicoInfo = async (dico: string) => {
    const response = await getDictionaryProduct(dico, dico);
    return response;
  };

  const handleAddDicoInfo = async (dico: string) => {
    const name = dico.split("-")[1];
    setIsOpenD(true);
    setDicoInfo(name);
    const response = await getDicoInfo(name);
    console.log(response);
  };

  const handleDictionary = async () => {
    const response = await getDictionary(localStorage.getItem("address") || "");
    setDict(response);
  };

  useEffect(() => {
    handleGroup();
    handleDictionary();
  }, []);

  const FormInput = ({ name }: { name: string }) => {
    if (name === "Group name") {
      return (
        <div className="group">
          <input
            name={name}
            onChange={(e) => (GroupName.current = e.target.value)}
            type="text"
            className="input text-headline"
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className={"label"}>{name}</label>
        </div>
      );
    }

    if (name === "Dictionary name") {
      return (
        <div className="group">
          <input
            name={name}
            onChange={(e) => (DicoRef.current = e.target.value)}
            type="text"
            className="input text-headline"
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className={"label"}>{name}</label>
        </div>
      );
    }

    return (
      <div className="group">
        <input
          required
          name={name}
          type="text"
          className="input text-headline"
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label className={"label"}>{name}</label>
      </div>
    );
  };

  const handleDelete = async (dico: string) => {
    const response = await deleteDict(dico);
    console.log(response);
    handleDictionary();
  };

  const handleSigner = async () => {
    const signature = await signMessage({ message: "hello world" });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, []);

  return (
    <>
      <div
        className={`${isOpenGroup ? "block w-full h-full absolute" : "hidden"}`}
      >
        <div
          className={
            "w-full h-full bg-backgroundRgba absolute flex items-center justify-center"
          }
        >
          <form
            ref={formRefD} // Assurez-vous que formRefD est associé ici
            onSubmit={(e) => onSubmitGroup(e)}
            className={
              "p-4 w-1/4 h-[30%] bg-background flex flex-col justify-between rounded-lg"
            }
          >
            <header
              className={
                "h-[10%] w-full  flex justify-between text-white items-center"
              }
            >
              <label className={"font-poppinsMedium text-lg"}>
                Give a name to the group
              </label>
              <button onClick={() => setIsOpenG(false)}>
                <IoCloseSharp className={"text-2xl"} />
              </button>
            </header>
            <FormInput name={"Group name"} />
            <button
              type="submit"
              className={
                "flex bg-button text-white font-poppinsBold items-center text-lg p-2 rounded-lg w-fit hover:bg-buttonhover"
              }
            >
              Save
            </button>
          </form>
        </div>
      </div>

      <div className={`${isOpenG ? "block w-full h-full absolute" : "hidden"}`}>
        <div
          className={
            "w-full h-full bg-backgroundRgba absolute flex items-center justify-center"
          }
        >
          <form
            ref={formRefD} // Assurez-vous que formRefD est associé ici
            onSubmit={(e) => onSubmitDico(e)}
            className={
              "p-4 w-1/4 h-[30%] bg-background flex flex-col justify-between rounded-lg"
            }
          >
            <header
              className={
                "h-[10%] w-full  flex justify-between text-white items-center"
              }
            >
              <label className={"font-poppinsMedium text-lg"}>
                Give a name to the dictionary
              </label>
              <button onClick={() => setIsOpenG(false)}>
                <IoCloseSharp className={"text-2xl"} />
              </button>
            </header>
            <FormInput name={"Dictionary name"} />
            <button
              type="submit"
              className={
                "flex bg-button text-white font-poppinsBold items-center text-lg p-2 rounded-lg w-fit hover:bg-buttonhover"
              }
            >
              Save
            </button>
          </form>
        </div>
      </div>
      <div className={`${isOpenD ? "block w-full h-full absolute" : "hidden"}`}>
        <div
          className={
            "w-full h-full bg-backgroundRgba absolute flex items-center justify-center"
          }
        >
          <form
            ref={formRefD} // Assurez-vous que formRefD est associé ici
            onSubmit={(e) => onSubmitD(e, dicoInfo)}
            className={
              "p-4 w-1/4 h-[70%] bg-background flex flex-col justify-between rounded-lg"
            }
          >
            <header
              className={
                "h-[10%] w-full  flex justify-between text-white items-center"
              }
            >
              <label className={"font-poppinsMedium text-lg"}>
                Save the {dicoInfo} product to your inventory
              </label>
              <button onClick={() => setIsOpenD(false)}>
                <IoCloseSharp className={"text-2xl"} />
              </button>
            </header>
            <fieldset className={"h-[60%] flex flex-col gap-10"}>
              <ul className={"grid grid-cols-2 gap-5"}>
                <FormInput key={"named"} name={"Product name"} />
                <FormInput key={"priced"} name={"Price"} />
                <FormInput key={"sized"} name={"size"} />
                <FormInput key={"stated"} name={"state"} />
                <FormInput key={"unitd"} name={"unit"} />
              </ul>
              <label className="custum-file-upload">
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                        fill=""
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="text">
                  <span>Click to upload image</span>
                </div>
                <input name={"imaged"} id="file" type="file" />
              </label>
            </fieldset>
            <span className={"flex justify-around"}>
              <button
                type="submit"
                className={
                  "flex bg-button text-white font-poppinsBold items-center text-lg p-2 rounded-lg w-fit hover:bg-buttonhover"
                }
              >
                Save
              </button>
              <button
                onClick={() => handleDelete(dicoInfo)}
                className={
                  "bg-[red]  text-white font-poppinsBold p-2 rounded-lg"
                }
              >
                Delete
              </button>
            </span>
          </form>
        </div>
      </div>
      <DefaultViewLoginTemplate>
        <div className={"w-full h-full flex gap-5 flex-col"}>
          <header
            className={
              "h-[10%] w-full bg-background rounded-lg text-headline flex items-center p-10"
            }
          >
            <h1 className={"font-poppinsBold text-3xl"}>Inventory</h1>
          </header>
          <section
            className={
              "w-full h-[7%] bg-background rounded-lg flex items-center gap-3"
            }
          >
            <button
              onClick={() => setIsOpenGroup(true)}
              className={
                "font-poppins h-full text-white bg-button p-2 rounded-lg"
              }
            >
              Create a group
            </button>
            {Groups?.inactive.map((group) => (
              <button
                key={group.name}
                className={
                  "font-poppins h-full text-white border border-button p-2 rounded-lg"
                }
              >
                {group.name}
              </button>
            ))}{" "}
            {Groups?.active.map((group) => (
              <button
                key={group.name}
                className={
                  "font-poppins h-full text-white border border-button p-2 rounded-lg"
                }
              >
                {group.name}
              </button>
            ))}
          </section>
          <div className={"w-full h-[80%] flex"}>
            <section className={"w-[80%]"}></section>
            <aside className={"w-[20%] h-full bg-background p-3"}>
              <button
                className={
                  "flex bg-button text-white font-poppinsBold w-full justify-center items-center text-lg p-2 rounded-lg ml-auto mr-10 hover:bg-buttonhover"
                }
                onClick={() => setIsOpenG(true)}
              >
                Create a dictionnary
              </button>
              <section className={"py-5 flex flex-col gap-3"}>
                {Object.keys(dict).map((key) => (
                  <button
                    onClick={() => handleAddDicoInfo(key)}
                    key={key}
                    className={
                      "h-auto w-full border border-button text-headline rounded-lg flex items-center p-2"
                    }
                  >
                    <p>{dict[key].name}</p>
                    <p>
                      {JSON.stringify(dict[key].presetProducts).length > 2 ? (
                        <FaCheck className={"text-2xl text-button"} />
                      ) : (
                        <HiOutlineDotsHorizontal
                          className={"text-2xl text-button"}
                        />
                      )}
                    </p>
                  </button>
                ))}
              </section>
            </aside>
          </div>
        </div>
      </DefaultViewLoginTemplate>
    </>
  );
};

export default Inventory;
