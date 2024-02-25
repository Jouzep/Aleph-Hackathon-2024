import { FaCheck } from "react-icons/fa";

const PricingView = () => {
  const pricesList = [
    {
      title: "Standard",
      price: "5€",
      services: [
        "Illimited listing",
        "Decentralised stock",
        "3 Simultaneous box",
        "24/7 support",
      ],
    },
    {
      title: "Premium",
      price: "10€",
      services: [
        "Illimited listing",
        "Decentralised stock",
        "5 Simultaneous box",
        "Dropable box",
        "24/7 support",
      ],
    },
    {
      title: "Pro",
      price: "20€",
      services: [
        "Illimited listing",
        "Decentralised stock",
        "Illimited Simultaneous box",
        "Dropable box",
        "24/7 support",
      ],
    },
  ];

  return (
    <div className={"w-full h-full mt-10 flex justify-center"}>
      <main className={"w-[70%] h-full flex items-start gap-3 mt-10"}>
        {pricesList.map((price, index) => {
          return (
            <PricingCard
              title={price.title}
              price={price.price}
              services={price.services}
              key={index}
              index={index}
            />
          );
        })}
      </main>
    </div>
  );
};

const PricingCard = ({
  title,
  price,
  services,
  index,
}: {
  title: string;
  price: string;
  services: string[];
  index: number;
}) => {
  return (
    <section
      className={`w-[30%] h-auto border hover:border-buttonhover border-button p-4 flex flex-col gap-5`}
    >
      <header>
        <h1 className={"text-headline font-poppinsBold text-xl"}>{title}</h1>
        {title !== "Pro" ? (
          <p className={"text-button font-poppinsBold text-3xl"}>
            {price}/month
          </p>
        ) : (
          <p className={"text-button font-poppinsBold text-3xl"}>
            {price}/life time
          </p>
        )}
      </header>
      <ul className={"text-text font-poppins flex flex-col gap-3"}>
        {services.map((service) => {
          return (
            <li className="flex items-center gap-2" key={service}>
              <FaCheck className="text-button" />
              {service}
            </li>
          );
        })}
      </ul>
      <button
        className={
          "bg-button p-3 w-fit text-lg font-poppinsSemiBold text-headline rounded-lg"
        }
      >
        Get standard
      </button>
    </section>
  );
};

export default PricingView;
