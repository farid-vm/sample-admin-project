"use client";
import { User, ROLES } from "@/libs/types/user";
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
  }
  useEffect(() => {
    const handleScroll = () => {
      if (
        !containerRef.current ||
        isFetching.current ||
        !hasMore ||
        searchvalue.trim() !== ""
      )
        return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchUsers(page + 1);
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, searchvalue]);
  useEffect(() => {
    setUsers(initialUsers); 
    updateMirrorUsers(initialUsers);
  }, [initialUsers]);
  return (
    <div
      ref={containerRef}
      className="w-full bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-zinc-700"
      style={{ height: "70vh", overflowY: "auto" }}
    >
      <div className="bg-cyan-800 sticky top-0 z-10">
        <div className="flex flex-row justify-between p-4 border-b border-gray-200 text-gray-50">
          <h2 className="w-full">Members/Users</h2>
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
      <table className="w-full text-left border-collapse">
        <tbody className="divide-y divide-gray-200">
          {usersMirror?.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 text-gray-900 font-medium">{u.name}</td>
              <td className="p-4 text-gray-600">{u.email}</td>
              <td className="p-4">
                <select
                  defaultValue={u.role}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 dark:text-gray-200"
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-4 text-gray-500 text-sm">
                {new Date(u.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && (
        <div className="flex justify-center p-4 text-center text-gray-500">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
