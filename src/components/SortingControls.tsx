import { SortBy } from "../lib/types";

type SortingProps = {
  sortedBy: SortBy;
  setSortedBy: React.Dispatch<React.SetStateAction<SortBy>>;
};

export default function Sorting({ sortedBy, setSortedBy }: SortingProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        onClick={() => setSortedBy("relevant")}
        className={`sorting__button sorting__button--relevant ${
          sortedBy === "relevant" ? "sorting__button--active" : ""
        }`}
      >
        Relevant
      </button>

      <button
        onClick={() => setSortedBy("recent")}
        className={`sorting__button sorting__button--recent ${
          sortedBy === "recent" ? "sorting__button--active" : ""
        }`}
      >
        Recent
      </button>
    </section>
  );
}
