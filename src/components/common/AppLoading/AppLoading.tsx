const AppLoading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50">
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    </div>
  );
};

export default AppLoading;
