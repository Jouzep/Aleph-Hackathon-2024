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

export default DefaultViewTemplate;
