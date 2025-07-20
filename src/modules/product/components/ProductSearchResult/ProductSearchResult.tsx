"use client";

import { Container } from "@/components/layouts";
import { useI18n } from "@/hooks";
import { useProducts } from "@/services/product";
import ResultItem from "./ResultItem";
import ResultSkeletonList from "./ResultSkeletonList";

type ProductSearchResultProps = {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
};

const ProductSearchResult = ({
  keyword,
  onKeywordChange,
}: ProductSearchResultProps) => {
  const { t, currentLocale } = useI18n();

  const searchQuery = keyword;

  // Suggestions based on current locale
  const suggestions = [
    {
      id: 1,
      name: t("product.searchSuggestions.airFilter"),
    },
    {
      id: 2,
      name: t("product.searchSuggestions.fuelFilter"),
    },
    {
      id: 3,
      name: t("product.searchSuggestions.oilFilter"),
    },
  ];

  const { data: products, isLoading } = useProducts({
    search: keyword,
    limit: 100,
    lang: currentLocale,
  });
  const resultCount = products?.length || 0;

  return (
    <Container>
      <div className="py-6">
        {/* Search Header */}
        <div className="mb-6">
          {keyword && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {t("product.searchResults")}
              </h1>
              <p className="text-gray-600">
                {t("product.searchResultsFor")}{" "}
                <span className="font-semibold text-brand-500">
                  "{searchQuery}"
                </span>{" "}
                - {resultCount} {t("product.resultsFound")}
              </p>
            </div>
          )}
          {/* Suggestions */}
          {!keyword && (
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {t("product.suggestions")}
              </h1>
              <div className="flex gap-2">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="text-gray-600 hover:text-brand-500 cursor-pointer truncate"
                    onClick={() => onKeywordChange(suggestion.name)}
                  >
                    {suggestion.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Results */}
        <div className="flex-1">
          {/* Product List */}
          <div className="pt-5 max-h-[400px] px-5 pb-5 overflow-y-auto">
            {isLoading ? (
              <ResultSkeletonList count={8} />
            ) : (
              <div className="space-y-4">
                {products?.map((product) => (
                  <ResultItem
                    key={product.id}
                    {...product}
                    isHighlighted={product.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())}
                  />
                ))}
              </div>
            )}
          </div>

          {/* No Results */}
          {!isLoading && resultCount === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("product.noResultsFound")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("product.noResultsDescription")}
              </p>
              <button className="bg-brand-500 text-white px-6 py-2 rounded-lg hover:bg-brand-600 transition-colors">
                {t("product.browseAllProducts")}
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProductSearchResult;
