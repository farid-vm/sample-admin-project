import { UserList } from "@/components/UserList";
import { addQueryParams } from "@/libs/helpers/main";
import { User, UserListParams, UserResponse } from "@/libs/types/user";

export default async function Users({
  params,
  searchParams,
}: {
  params: any
  searchParams: Promise<UserListParams>;
}) {
  const userParams = await searchParams;
  let query = 'http://localhost:4000/users';
  query = addQueryParams(query, userParams);
  const getusers = await fetch(query,{
  cache: 'force-cache',
});
  if (!getusers.ok) {
    throw new Error("Failed to fetch users");
  }
  console.log("@@@@@@@@@")
  const users: User[] = await getusers.json();
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="w-full max-w-6xl space-y-6">
        <UserList initialUsers={users} userParams={userParams} />
      </div>
    </div>
  );
}
