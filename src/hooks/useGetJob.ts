import { JOB, JobDataType } from "../lib/types";
import { useQuery } from "@tanstack/react-query";
import useErrorNotification from "./useErrorNotification";
import getJobItem from "../lib/util/getJobItem";

export default function useGetJob(id: number | null): [JOB | null, boolean] {
  const { data, isLoading, isError } = useQuery<JobDataType, Error>({
    queryKey: ["job-item", id],
    queryFn: () => {
      if (!id) {
        throw new Error(`Invalid JOB ID - ${id}`);
      }
      return getJobItem(id);
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(id),
  });
  const errorMessage = "No Job Found with the given ID. Please try again.";

  useErrorNotification(isError, errorMessage, 4000);

  return [data?.jobItem || null, isLoading];
}
