import Navbar from "./Navbar";

const DefaultViewTemplate = ({
  children,
  sectionId,
}: {
  children: React.ReactNode;
  sectionId: string;
}) => {
  return (
    <div className={"w-full h-screen bg-background"} id={sectionId}>
      {children}
    </div>
  );
};

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"w-full relative flex justify-center bg-background"}>
      <Navbar />
      <div className={"w-full"}>{children}</div>
    </div>
  );
};

export const DefaultViewLoginTemplate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={"h-screen w-full bg-[#36333C] p-10"}>{children}</div>;
};

export default DefaultViewTemplate;
