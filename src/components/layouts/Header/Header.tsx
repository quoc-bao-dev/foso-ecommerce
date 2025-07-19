import BottomHeader from "./BottomHeader";
import SmallOne from "./SmallOne";
import TopHeader from "./TopHeader";

const Header = () => {
  return (
    <header className="bg-white">
      <SmallOne />
      <div className="h-6"></div>
      <TopHeader />
      <div className="h-6"></div>
      <BottomHeader />
      <div className="h-4"></div>
    </header>
  );
};

export default Header;
