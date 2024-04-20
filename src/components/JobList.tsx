import useActiveId from "../hooks/useActiveId";
import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobs: JobItem[];
  isLoading: boolean;
};

export function JobList({ jobs, isLoading }: JobListProps) {
  const activeId = useActiveId();
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobs.map((job) => (
          <JobListItem key={job.id} job={job} isActive={activeId === job.id} />
        ))
      )}
    </ul>
  );
}

export default JobList;
