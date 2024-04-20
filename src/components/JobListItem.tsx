import BookmarkIcon from "./BookmarkIcon";
import { JobItem } from "../lib/types";

type JobListItemProps = {
  job: JobItem;
  isActive: boolean;
};

export default function JobListItem({ job, isActive }: JobListItemProps) {
  return (
    <li className={`job-item${isActive ? "--active" : ""}`}>
      <a href={`#${job.id}`} className="job-item__link">
        <div className="job-item__badge">{job.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{job.title}</h3>
          <p className="job-item__company">{job.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon id={job.id} />
          <time className="job-item__time">{job.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
