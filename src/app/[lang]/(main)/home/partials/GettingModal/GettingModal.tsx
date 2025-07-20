import { AutoPopupModal } from "@/components/common";

const GettingModal = () => {
  return (
    <AutoPopupModal
      title="Tính năng kỹ thuật nổi bật"
      content={
        <div className="max-h-[60vh] overflow-y-auto">
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Công nghệ nền tảng
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Next.js 15 với App Router và TypeScript</li>
                <li>• Tailwind CSS v4 với PostCSS</li>
                <li>• Zustand cho quản lý state toàn cục</li>
                <li>• TanStack Query v5 cho data fetching và caching</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Đa ngôn ngữ & SEO
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Hỗ trợ đa ngôn ngữ với Next-intl</li>
                <li>• Static rendering cho từng ngôn ngữ (/vi, /en)</li>
                <li>• Pre-render các trang chi tiết sản phẩm</li>
                <li>• Tối ưu SEO với meta tags động</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Server-Side Processing
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Search server-side với debouncing và caching</li>
                <li>• Filter server-side với caching</li>
                <li>• Load sản phẩm để render static pages</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Performance & UX
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Infinite loading tối ưu trải nghiệm người dùng</li>
                <li>• Custom hooks: useDevice, useInView, useDebounce</li>
                <li>• Swiper carousel với autoplay và navigation</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Responsive Design
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Tương thích đa thiết bị (desktop, tablet, mobile)</li>
                <li>• Adaptive layouts và custom breakpoints</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Tính năng thương mại
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Quản lý giỏ hàng với persistent storage</li>
                <li>• Hệ thống đăng nhập với placeholder accounts</li>
              </ul>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default GettingModal;
