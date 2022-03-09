export const Loading: React.VFC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-ping h-2 w-2 bg-orange-500 rounded-full"></div>
      <div className="animate-ping h-2 w-2 bg-orange-500 rounded-full mx-4"></div>
      <div className="animate-ping h-2 w-2 bg-orange-500 rounded-full"></div>
    </div>
  );
};
