export const createDictionary = async ({
  name,
  address,
  isPriv,
}: {
  name: string;
  address: string;
  isPriv: boolean;
}) => {
  const url = "http://localhost:3001/dictionnary";

  console.log(name, address, isPriv);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        signature:
          "0xb13e88f5ff7669cc229228b6db166fc9d7eacc94f1a04862f9fbfb503c6f7ee77946938aed4c9f563bbe4698fc7f26cff51373a79a804f004e44838eb88a63181b",
        message: "hello world",
        address: address,
      },
      body: JSON.stringify({
        name: name,
        address: address,
        owner: address,
        private: isPriv,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
};
