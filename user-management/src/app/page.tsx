export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center  font-sans dark:bg-black">
      <div className="flex min-h-screen w-full mt-6 flex-col items-cente gap-6 py-10 px-16 bg-zinc-50 dark:bg-black sm:items-start">
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full 
            bg-cyan-900 px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/users"
          >
            Users
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px] opacity-50 cursor-not-allowed pointer-events-none"
            aria-disabled="true"
          >
            Contacts
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px] opacity-50 cursor-not-allowed pointer-events-none"
            aria-disabled="true"
          >
            Notes
          </a>
        </div>
      </div>
    </div>
  );
}
