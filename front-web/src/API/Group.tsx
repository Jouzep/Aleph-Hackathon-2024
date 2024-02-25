export const CreateGroup = async (name: string) => {
  const url = `http://localhost:3001/group/create`;
  const data = {
    name: name,
    owner: localStorage.getItem("address") || "",
    authorized: [""],
  };
  console.log(name);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        address: localStorage.getItem("address") || "",
        message: "hello world",
        signature:
          "0xb13e88f5ff7669cc229228b6db166fc9d7eacc94f1a04862f9fbfb503c6f7ee77946938aed4c9f563bbe4698fc7f26cff51373a79a804f004e44838eb88a63181b",
      },
      body: JSON.stringify({
        name: name,
        owner: localStorage.getItem("address"),
        authorized: ["test"],
      }),
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
};

export const getGroupList = async (address: string) => {
  const url = `http://localhost:3001/group/${address}/list`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
};

export const changeState = async (address: string, group: string) => {
  const url = `http://localhost:3001/group/${address}/${group}/state`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        address: localStorage.getItem("address") || "",
        message: "hello world",
        signature:
          "0xb13e88f5ff7669cc229228b6db166fc9d7eacc94f1a04862f9fbfb503c6f7ee77946938aed4c9f563bbe4698fc7f26cff51373a79a804f004e44838eb88a63181b",
      },
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
};

export const addProductToGroup = async (
  group: string,
  name: string,
  price: number,
  size: number,
  state: string,
  quantity: number,
) => {
  const url = "http://localhost:3001/group/update";
  const address: string = localStorage.getItem("address") || "";

  console.log(
    JSON.stringify({
      ownerAddress: address,
      groupName: group,
      product: {
        name: name,
        description: "produc desc",
        price: price,
        size: size,
        state: state,
        quantity: quantity,
      },
    }),
  );
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ownerAddress: address,
        message: "hello world",
        signature:
          "0xb13e88f5ff7669cc229228b6db166fc9d7eacc94f1a04862f9fbfb503c6f7ee77946938aed4c9f563bbe4698fc7f26cff51373a79a804f004e44838eb88a63181b",
      },
      body: JSON.stringify({
        ownerAddress: address,
        groupName: group,
        product: {
          name: name,
          description: "produc desc",
          price: price,
          size: size,
          state: state,
          quantity: quantity,
        },
      }),
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
};

export const getGroupProducts = async (group: string) => {
  const url = `http://localhost:3001/group/${localStorage.getItem("address")}/${group}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    console.log("get group =======", response);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
};
