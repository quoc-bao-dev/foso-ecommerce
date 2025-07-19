import { Container } from "../Container";

const SmallOne = () => {
  return (
    <div className="h-6 bg-gradient-to-l from-[#0D57C6] via-[#37CFFF] to-[#0D57C6] ">
      <Container className="h-full">
        <div className="flex item-center justify-between h-full text-white">
          <div className="flex items-center gap-2 ">
            <img src="/icon/discount.png" alt="percent" className="w-4 h-4" />
            <p className="text-xs text-white ">
              Nhập mã <span className="text-[#FACA4A]">NEWBIE</span> giảm ngay
              10% cho lần đầu mua hàng.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <img src="/icon/phone.png" alt="phone" className="w-4 h-4" />
              <p className="text-xs text-white ">Hotline: 1900 558 888</p>
            </div>
            <div className="flex items-center gap-2">
              <img src="/icon/app.png" alt="app" className="w-4 h-4" />
              <p className="text-xs text-white ">Tải ứng dụng</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SmallOne;
