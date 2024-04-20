// Custom Hook to fetch jobs from the API
import { API } from "../lib/constants";
import { JOBITEM } from "../lib/types";
import { useQuery } from "@tanstack/react-query";
import useErrorNotification from "./useErrorNotification";

type DataProps = {
  public: boolean;
  sorted: boolean;
  jobItems: JOBITEM[];
};

const searchJobItems = async (search: string) => {
  const response = await fetch(`${API}?search=${search}`);
  // 4xx or 5xx errors
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data: DataProps = await response.json();
  return data;
};

type UseSearchJobsReturnType = [JOBITEM[], boolean];

export default function useSearchJobs(search: string): UseSearchJobsReturnType {
  const { data, isLoading, isError, error } = useQuery<DataProps, Error>({
    queryKey: ["job-items", search],
    queryFn: () => searchJobItems(search),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(search),
  });

  const errorMessage =
    error?.message || "An error occurred while fetching jobs.";

  useErrorNotification(isError, errorMessage, 4000);

  return [data?.jobItems || [], isLoading];
}
