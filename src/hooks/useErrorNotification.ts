import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useErrorNotification(
  isError: boolean,
  description: string,
  duration: number
) {
  useEffect(() => {
    if (isError) {
      toast.error(description, {
        duration,
      });
    }
  }, [description, isError, duration]);
}
