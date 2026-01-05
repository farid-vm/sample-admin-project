import { UserList } from "@/components/UserList";
import { User, UserResponse } from "@/libs/types/user";

export default async function Users() {
  const getusers = await fetch("http://localhost:4000/users");
  if (!getusers.ok) {
    throw new Error("Failed to fetch users");
  }
  const users: User[] = await getusers.json();
  console.log(users);
  if (!users) return <>Not found</>;
  return (
    <UserList initialUsers={users} />
  );
}
