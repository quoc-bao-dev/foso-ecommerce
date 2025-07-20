import { useI18n } from "@/hooks";
import { useCategories } from "@/services/category";

const SubCategory = () => {
  const { currentLocale } = useI18n();
  const { data: categories } = useCategories({
    limit: 6,
    lang: currentLocale,
  });
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories?.map((sub, idx) => (
        <div
          key={sub.name + idx}
          className="flex items-center gap-4 h-[94px] bg-white rounded-xl px-6 cursor-pointer hover:shadow border border-transparent hover:border-[#0155C6] transition"
        >
          <img
            src={sub.image}
            alt={sub.name}
            className="h-full w-auto aspect-square object-contain"
          />
          <span className="font-semibold text-lg">{sub.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SubCategory;
