import { UserList } from "@/components/UserList";
import { addQueryParams } from "@/libs/helpers/main";
import { User, UserListParams } from "@/libs/types/user";

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
    cache: 'no-store',
  });
  if (!getusers.ok) {
    throw new Error("Failed to fetch users");
  }
  const users: User[] = await getusers.json();
  return (
    <div className="flex flex-col items-center justify-start min-h-screen md:bg-gray-50 md:p-8">
      <div className="w-full max-w-6xl space-y-6">
        <UserList initialUsers={users} userParams={userParams} />
      </div>
    </div>
  );
}
