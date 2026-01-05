import UserDetail from "@/components/UserDetail";
import { User } from "@/libs/types/user";

export default async function Page({
  params,
}: {
  params: Promise<{id: string}>
}) {
    const {id} = await params;
    const query = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`;
    const getuser = await fetch(query,{
        cache: 'no-store',
    });
    if (!getuser.ok) {
        throw new Error("Failed to fetch user");
    }
    const user: User = await getuser.json();
    return (
        <div className="flex flex-col items-center justify-start min-h-screen md:bg-gray-50 md:p-8">
            <div className="w-full max-w-6xl space-y-6">
                <UserDetail user={user} />
            </div>
        </div>
    );
}