import Link from "next/link";

const Breadcrumbs = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href="/">
        <span className="text-text-disable text-sm">Trang chủ</span>
      </Link>
      <span className="text-text-disable">&gt;</span>
      <Link href="/">
        <span className="text-brand-700 text-sm">Sản phẩm</span>
      </Link>
    </div>
  );
};

export default Breadcrumbs;
