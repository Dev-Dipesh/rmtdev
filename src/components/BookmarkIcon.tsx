import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import useBookmarkContext from "../hooks/useBookmarkContext";

export default function BookmarkIcon({ id }: { id: number }) {
  const { bookmarkIds, handleToggleBookmark } = useBookmarkContext();

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    handleToggleBookmark(id);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <button onClick={onClickHandler} className="bookmark-btn">
      <BookmarkFilledIcon
        className={bookmarkIds.includes(id) ? "filled" : ""}
      />
    </button>
  );
}
