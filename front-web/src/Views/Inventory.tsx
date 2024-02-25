import { DefaultViewLoginTemplate } from "../Component/DefaultViewTemplate";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import "../Style/Input.css";
import { useSignMessage } from "wagmi";
import { createDictionary, getDictionary } from "../API/Dictionary";

const Inventory = () => {
  const { data, isError, isSuccess, signMessage } = useSignMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenG, setIsOpenG] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const GroupName = useRef("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(formRef.current!);
    e.preventDefault();
    console.log(
      formData.get("Product name"),
      formData.get("Description"),
      formData.get("Price"),
      formData.get("size"),
      formData.get("state"),
      formData.get("quantity"),
      formData.get("image"),
    );
  }
  const onSubmitG = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(localStorage.getItem("address") + " ");
    e.preventDefault();
    const response = await createDictionary({
      name: GroupName.current,
      address: localStorage.getItem("address") || "",
      isPriv: true,
    });
    console.log(response);
  };

  const handleDictionary = async () => {
    const response = await getDictionary(localStorage.getItem("address") || "");
    console.log(response);
  };

  useEffect(() => {
    handleDictionary();
  }, []);

  const FormInput = ({ name }: { name: string }) => {
    if (name === "Group name") {
      return (
        <div className="group">
          <input
            required
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
      <div className={`${isOpen ? "block w-full h-full absolute" : "hidden"}`}>
        <div
          className={
            "w-full h-full bg-backgroundRgba absolute flex items-center justify-center"
          }
        >
          <form
            ref={formRef}
            onSubmit={onSubmit}
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
                Add an item to your inventory
              </label>
              <IoCloseSharp className={"text-2xl"} />
            </header>
            <fieldset className={"h-[60%] flex flex-col gap-10"}>
              <ul className={"grid grid-cols-2 gap-5"}>
                <FormInput key={"name"} name={"Product name"} />
                <FormInput key={"desc"} name={"Description"} />
                <FormInput key={"price"} name={"Price"} />
                <FormInput key={"size"} name={"size"} />
                <FormInput key={"state"} name={"state"} />
                <FormInput key={"quantity"} name={"quantity"} />
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
                <input name={"image"} id="file" type="file" />
              </label>
            </fieldset>
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
            onSubmit={onSubmitG}
            className={"h-auto w-auto bg-background rounded-lg p-10"}
          >
            <fieldset className={"flex flex-col gap-5"}>
              <header>
                <h1 className={"text-white font-poppinsBold text-xl"}>
                  Give a name to your group
                </h1>
              </header>
              <span className={"flex gap-3"}>
                <FormInput name={"Group name"} />
                <button
                  type="submit"
                  className={
                    "flex bg-button text-white font-poppinsBold items-center text-lg p-2 rounded-lg w-fit hover:bg-buttonhover"
                  }
                >
                  Save
                </button>
              </span>
            </fieldset>
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
            <button
              onClick={() => setIsOpenG(true)}
              className={
                "flex bg-button text-white font-poppinsBold items-center text-lg p-2 rounded-lg ml-auto mr-10 hover:bg-buttonhover"
              }
            >
              <IoMdAdd />
              Add item
            </button>
          </header>
          <section
            className={
              "w-full h-[6%] bg-background rounded-lg flex items-center"
            }
          >
            <button
              onClick={() => setIsOpenG(true)}
              className={
                "font-poppins h-full text-white bg-button p-2 rounded-lg"
              }
            >
              Create a group
            </button>
          </section>
        </div>
      </DefaultViewLoginTemplate>
    </>
  );
};

export default Inventory;
