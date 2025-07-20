import { AutoPopupModal } from "@/components/common";

const GettingModal = () => {
  return (
    <AutoPopupModal
      title="Tính năng kỹ thuật nổi bật"
      content={
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Công nghệ</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Next.js 15 với App Router và TypeScript</li>
              <li>• Tailwind CSS v4 với PostCSS</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              State Management & Data Fetching
            </h3>
            <ul className="space-y-1 text-gray-600">
              <li>• TanStack Query v5, xử lí caching, infinite queries</li>
              <li>• Zustand cho global state management</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Performance & UX
            </h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Custom hooks: useDevice, useInView, useDebounce</li>
              <li>• Debounced search với real-time suggestions</li>
              <li>• Swiper carousel với autoplay và navigation</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Internationalization
            </h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Next-intl với routing đa ngôn ngữ</li>
              <li>• Dynamic locale switching</li>
              <li>• SEO-friendly URLs cho từng ngôn ngữ</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Responsive Design
            </h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Mobile-first approach</li>
              <li>• Custom breakpoints và device detection</li>
              <li>• Adaptive layouts cho mọi thiết bị</li>
            </ul>
          </div>
        </div>
      }
    />
  );
};

export default GettingModal;
