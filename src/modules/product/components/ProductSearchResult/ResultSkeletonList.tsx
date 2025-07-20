import ResultSkeleton from "./ResultSkeleton";

interface ResultSkeletonListProps {
  count?: number;
}

const ResultSkeletonList = ({ count = 8 }: ResultSkeletonListProps) => {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, index) => (
        <ResultSkeleton key={index} />
      ))}
    </div>
  );
};

export default ResultSkeletonList;
