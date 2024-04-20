// type UseOnClickOutsideProps = {
//   refs: React.RefObject<HTMLElement>[];
//   handler: () => void;
// }

import { useEffect } from "react";

export default function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const clickEventHandler = (e: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(e.target as Node))) {
        handler();
      }
    };

    document.addEventListener("click", clickEventHandler);

    return () => document.removeEventListener("click", clickEventHandler);
  }, [refs, handler]);
}
