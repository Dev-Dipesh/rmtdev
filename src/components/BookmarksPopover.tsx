import JobList from "./JobList";
import useBookmarkContext from "../hooks/useBookmarkContext";
import { forwardRef } from "react";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobs, isLoading } = useBookmarkContext();
  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobs={bookmarkedJobs} isLoading={isLoading} />
    </div>,
    document.body
  );
});

export default BookmarksPopover;
