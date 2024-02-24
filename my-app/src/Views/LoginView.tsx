import { GetAccountFromProvider } from "aleph-sdk-ts/dist/accounts/ethereum";

const LoginView = () => {
  const provider = window.ethereum;
  async function test() {
    const account = await GetAccountFromProvider(provider);
  }
  return (
    <div className={"w-full h-screen bg-background"}>
      <button onClick={test}>Login</button>
    </div>
  );
};

export default LoginView;
