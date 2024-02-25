const Dashboard = () => {
  return (
    <div className={"h-screen w-[100vw] bg-[#36333C] p-10"}>
      <header
        className={
          "h-[10%] w-full bg-background rounded-lg text-headline flex items-center p-10"
        }
      >
        <h1 className={"font-poppinsBold text-3xl"}>Dashboard</h1>
      </header>
      <main className={"h-[90%] py-10 grid grid-cols-3 gap-4"}>
        <section
          className={
            "border border-border bg-background flex items-center justify-center text-text rounded-lg col-span-2"
          }
        ></section>
        <section
          className={
            "border border-border bg-background flex items-center justify-center text-text rounded-lg col-span-1"
          }
        ></section>
        <section
          className={
            "border border-border bg-background flex items-center justify-center text-text rounded-lg col-span-1"
          }
        ></section>
        <section
          className={
            "border border-border bg-background flex items-center justify-center text-text rounded-lg col-span-2"
          }
        ></section>
      </main>
    </div>
  );
};

export default Dashboard;
