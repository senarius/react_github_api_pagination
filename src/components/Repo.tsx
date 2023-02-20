import { useState, useEffect } from 'react';
import useSWR from "swr";
import axios from "axios";
import { useDynamicDebounce } from 'react-dynamic-debounce';
import RepoList from "./RepoList";
import Pagination from "./Pagination";

export type Owner = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export type Repo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  url: string;
  html_url: string;
};

export type Meta = {
  total_count: number;
  incomplete_results: boolean;
  items: Repo[];
}

const Repo = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("desc");
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const GIT_API_LIMIT = 1000;

  const fetcher:any = async (url: string) => {

    const res = await axios.get(url, 
      {
        headers: {
          Accept: 'application/vnd.github.text-match+json',
          'Content-Type': 'application/json'
        },
      },
    )
    if ((res.data as Meta).total_count) {
      if ((res.data as Meta).total_count > 1000) {
        setTotal(GIT_API_LIMIT);
      } else {
        setTotal((res.data as Meta).total_count);
      }
    }
    return res.data;
  };

  const [debouncedValue, setDebouncedValue, { delay }] = useDynamicDebounce('python', {
		defaultDelay: 500,
		delayFunction: (averageGap) => Math.floor(averageGap + 275),
	});

  const { data, error } = useSWR<Meta, Error>(
    `https://api.github.com/search/repositories?q=${debouncedValue}&sort=${sortBy}&order=${order}&per_page=${limit}&page=${page}`,
    fetcher
  );

  return (
    <div className="mb-50">
      <form>
        <label className="inline-flex">
          <input onChange={(e) => setDebouncedValue(e.target.value)} defaultValue={debouncedValue} placeholder="Enter your keyword to search" type="text" className="w-300"/>
          <span className="flex items-center pr-2">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
              height="30" viewBox="0 0 30 30">
              <path
                d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
              </path>
            </svg>
          </span>
        </label>
      </form>
      <RepoList repos={data?.items as Repo[]}/>
      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={total}
      />
    </div>
  );
};

export default Repo;