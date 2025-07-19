import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`mx-auto px-4 md:px-6 lg:0 max-w-[1440px] ${className}`}>
      {children}
    </div>
  );
};

export default Container;
