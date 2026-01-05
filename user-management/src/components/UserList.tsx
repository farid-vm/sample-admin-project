"use client";
import { User } from "@/libs/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "./LodingSpinner";

export const UserList = ({
  initialUsers,
  userParams,
}: {
  initialUsers: User[];
  userParams: { limit?: string; page?: string; search?: string };
}) => {
  const route = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(parseInt(userParams.page || "1"));
  const [hasMore, setHasMore] = useState(true);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [usersMirror, setUsersMirror] = useState<User[]>(initialUsers);
  const [searchvalue, setSearchValue] = useState(userParams.search || "");
  const limit = userParams.limit || "10";
  const fetchUsers = async (pageParam: number) => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    try {
      let query = `http://localhost:4000/users?limit=${limit}&page=${pageParam}`;
      if (searchvalue.trim() !== "") {
        query += `&search=${searchvalue}`;
      }
      const res = await fetch(query); //${roleFilter ? `&role=${roleFilter}` : ''}

      const data = await res.json();
      setUsers((prev) => [...prev, ...data]);
      setUsersMirror((prev) => [...prev, ...data]);
      if (data.length > 0) {
        setHasMore(data.length > 0);
        setPage((prev) => prev + 1);
        // Update URL without reloading
        const params = new URLSearchParams();
        params.set("page", pageParam.toString());
        window.history.replaceState(null, "", `/users?${params.toString()}`);
      } else {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };
  const updateMirrorUsers = (users: User[]) => {
    setUsersMirror(
      users.filter(
        (v) =>
          v.name.indexOf(searchvalue) !== -1 ||
          v.email.indexOf(searchvalue) !== -1
      )
    );
  };
  useEffect(() => {
    // Scroll logic moved to onScroll handler on the scrollable div
  }, [page, hasMore, searchvalue]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isFetching.current || !hasMore || searchvalue.trim() !== "") return;

    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchUsers(page + 1);
    }
  };
  useEffect(() => {
    setUsers(initialUsers);
    updateMirrorUsers(initialUsers);
  }, [initialUsers]);
  return (
    <div
      ref={containerRef}
      className="w-full bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-zinc-700 flex flex-col"
      style={{ height: "70vh" }}
    >
      <div className="bg-cyan-800 z-10 shrink-0">
        <div className="flex flex-row justify-between p-4 border-b border-gray-200 text-gray-50">
          <h2 className="w-full">Members</h2>
          <span className="w-full flex justify-end">
            <div className="relative flex items-center w-full max-w-xs justify-end">
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (searchvalue.trim() === "") {
                    setUsersMirror(users);
                    return;
                  }
                  updateMirrorUsers(users);
                  if (e.key === "Enter") {
                    route.replace(`/users?search=${searchvalue}`);
                  }
                }}
                value={searchvalue}
                className="p-2 pr-8 border placeholder:text-gray-50 text-gray-50 border-gray-300 rounded-md shadow-sm focus:outline-none text-sm w-full bg-transparent"
                type="text"
                placeholder="Search..."
              />
              {searchvalue.trim() !== "" && (
                <button
                  onClick={() => {
                    setSearchValue("");
                    setUsersMirror(users);
                    route.replace("/users");
                  }}
                  className="absolute right-2 text-gray-300 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </span>
        </div>
      </div>
      <div
        className="overflow-x-auto grow overflow-y-auto"
        onScroll={handleScroll}
      >
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-gray-100 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 sticky top-0">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Name
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Email
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Role
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
            {usersMirror?.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => route.push(`/users/${u.id}`)}
              >
                <td className="p-4 text-gray-900 font-medium">{u.name}</td>
                <td className="p-4 text-gray-600">{u.email}</td>
                <td className="p-4 text-gray-600">{u.role}</td>
                <td className="p-4 text-gray-500 text-sm">
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && (
        <div className="flex justify-center p-4 text-center text-gray-500">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
