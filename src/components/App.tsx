import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import Pagination from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import useSearchJobs from "../hooks/useSearchJobs";
import useDebounce from "../hooks/useDebounce";
import { Toaster } from "react-hot-toast";
import { JOBS_PER_PAGE } from "../lib/constants";
import { SortBy, PageinationDirection } from "../lib/types";

function App() {
  // State
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [jobs, isLoading] = useSearchJobs(debouncedSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedBy, setSortedBy] = useState<SortBy>("relevant");

  // Computed and Derived State
  const totalJobs = jobs.length;
  const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);

  // Sort jobs by relevance or recent. The data type for relevant is relevanceScore and for recent is daysAgo, both of type number.
  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortedBy === "relevant") {
      return b.relevanceScore - a.relevanceScore; // most relevant jobs first
    } else {
      return a.daysAgo - b.daysAgo; // recent jobs first
    }
  });

  // Retrieve jobs for the current page
  const start = (currentPage - 1) * JOBS_PER_PAGE; // 0
  const end = start + JOBS_PER_PAGE; // 7
  const jobsForCurrentPage = sortedJobs.slice(start, end); // [0, 1, 2, 3, 4, 5, 6]

  // Event Handlers and Actions
  const handlePageChange = (action: PageinationDirection) => {
    if (action === "prev") {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (action === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm search={search} setSearch={setSearch} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount count={totalJobs} />
            <Sorting sortedBy={sortedBy} setSortedBy={setSortedBy} />
          </SidebarTop>
          <JobList jobs={jobsForCurrentPage} isLoading={isLoading} />
          {totalJobs !== 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
