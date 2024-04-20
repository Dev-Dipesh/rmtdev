import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { JOBITEM } from "../lib/types";
import useGetJobs from "../hooks/useGetJobs";

type BookmarkContextType = {
  bookmarkIds: number[];
  handleToggleBookmark: (jobId: number) => void;
  bookmarkedJobs: JOBITEM[];
  isLoading: boolean;
};

export const BookmarkContext = createContext<BookmarkContextType | null>(null);

export default function BookmarkContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkIds, setBookmarkIds] = useLocalStorage<number[]>(
    "bookmarks",
    []
  );

  const { jobs, isLoading } = useGetJobs(bookmarkIds);

  const handleToggleBookmark = (jobId: number) => {
    if (bookmarkIds.includes(jobId)) {
      setBookmarkIds((prevIds) => prevIds.filter((id) => id !== jobId));
    } else {
      setBookmarkIds((prevIds) => [...prevIds, jobId]);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkIds,
        handleToggleBookmark,
        bookmarkedJobs: jobs,
        isLoading,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
