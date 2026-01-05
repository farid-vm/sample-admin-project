"use client";
import { User, ROLES } from "@/libs/types/user";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const UserList = ({ initialUsers, userParams }: { initialUsers: User[], userParams: { limit?: string, page?: string, search?: string } }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(parseInt(userParams.page || '1') );
  const [hasMore, setHasMore] = useState(true);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const limit = userParams.limit || '10';
  const fetchUsers = async (pageParam: number) => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:4000/users?limit=${limit}&page=${pageParam}`
      ); //${roleFilter ? `&role=${roleFilter}` : ''}
      const data = await res.json();
      setUsers((prev) => [...prev, ...data]);
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
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isFetching.current || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchUsers(page+1);
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [page, hasMore]);

  return (
      <div
        ref={containerRef}
        className="w-full bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-zinc-700"
        style={{ height: "70vh", overflowY: "auto" }}
      >
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-zinc-700 sticky top-0 z-10">
            <tr>
              <th className="p-4 font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-zinc-600">
                Name
              </th>
              <th className="p-4 font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-zinc-600">
                Email
              </th>
              <th className="p-4 font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-zinc-600">
                Role
              </th>
              <th className="p-4 font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-zinc-600">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
            {users?.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors"
              >
                <td className="p-4 text-gray-900 dark:text-gray-100 font-medium">
                  {u.name}
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {u.email}
                </td>
                <td className="p-4">
                  <select
                    defaultValue={u.role}
                    className="px-3 py-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 dark:text-gray-200"
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Loading more users...
          </div>
        )}
      </div>
  );
};
