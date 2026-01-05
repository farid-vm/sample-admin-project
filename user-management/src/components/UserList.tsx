"use client";
import { User } from "@/libs/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const UserList = ({ initialUsers }: { initialUsers: User[] }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const limit = 10;
  console.log(users);
  const fetchUsers = async (offsetParam: number) => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:4000/users?limit=${limit}&offset=${offsetParam}`
    ); //${roleFilter ? `&role=${roleFilter}` : ''}
    const data = await res.json();
    setUsers((prev) => [...prev, ...data]);
    if (data.length > 0) {
      setHasMore(data.length > 0);
      setOffset((prev) => prev + 1);
      // Update URL without reloading
      const params = new URLSearchParams();
      params.set("page", offset.toString());
      router.replace(`/users?${params.toString()}`);
    }
    setLoading(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchUsers(offset);
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [offset, loading, hasMore]);
  return (
    <div
      ref={containerRef}
      style={{
        height: "20vh",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "1rem",
      }}
    >
      <h1>Users</h1>
      {users?.map((u) => (
        <div key={u.id} style={{ marginBottom: "1rem" }}>
          <strong>{u.name}</strong> ({u.email}) — {u.role}
        </div>
      ))}
    </div>
  );
};
