import { API } from "../constants";
import { JobDataType } from "../types";

export default async function getJobItem(id: number) {
  const response = await fetch(`${API}/${id}`);
  // 4xx or 5xx errors
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data: JobDataType = await response.json();
  return data;
}
