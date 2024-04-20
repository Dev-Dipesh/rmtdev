import { useQueries } from "@tanstack/react-query";
import { JOB } from "../lib/types";
import useErrorNotification from "./useErrorNotification";
import getJobItem from "../lib/util/getJobItem";

const queryOptions = {
  staleTime: 1000 * 60 * 60, // 1 hour
  refetchOnWindowFocus: false,
  retry: false,
};

export default function useGetJobs(ids: number[]): {
  jobs: JOB[];
  isLoading: boolean;
} {
  const results = useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ["job-item", id],
        queryFn: () => {
          if (!id) {
            throw new Error(`Invalid JOB ID - ${id}`);
          }
          return getJobItem(id);
        },
        enabled: Boolean(id),
        ...queryOptions,
      };
    }),
  });

  const jobs = results
    .map((result) => result.data?.jobItem)
    .filter((job): job is JOB => job !== undefined);

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  const errorMessage = "Unable to locate the Job. Please try again.";

  useErrorNotification(isError, errorMessage, 4000);

  return {
    jobs,
    isLoading,
  };
}
