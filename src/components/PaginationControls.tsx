import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageinationDirection } from "../lib/types";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (action: PageinationDirection) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationProps) {
  return (
    <section className="pagination">
      {currentPage !== 1 && (
        <button
          className="pagination__button pagination__button--previous"
          onClick={(e) => {
            handlePageChange("prev");
            e.currentTarget.blur();
          }}
        >
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </button>
      )}
      {currentPage !== totalPages && (
        <button
          className="pagination__button pagination__button--next"
          onClick={(e) => {
            handlePageChange("next");
            e.currentTarget.blur();
          }}
        >
          Page {currentPage + 1}
          <ArrowRightIcon />
        </button>
      )}
    </section>
  );
}
