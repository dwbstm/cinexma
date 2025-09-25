interface ContentProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  isSpacerOnly?: boolean;
}

const Content: React.FC<ContentProps> = ({ children, variant, isSpacerOnly }) => {
  let style = "";

  switch (variant) {
    // With media logo
    case "primary":
      style = "-mt-[100px] tablet:-mt-[400px] laptop:-mt-[650px] desktop:-mt-[800px]";
      break;
    // Stack section
    case "secondary":
      style = "bg-background-dark pt-6 tablet:pt-12 pb-28 tablet:pb-12";
      break;
  }

  // Only apply when primary is passed
  if (isSpacerOnly) {
    return <div className="tablet:pb-5 relative space-y-8">{children}</div>;
  }

  return (
    <div
      className={`${style} transition-smooth tablet:space-y-12 tablet:px-0 space-y-6 overflow-x-hidden px-2`}
    >
      {children}
    </div>
  );
};

export default Content;
