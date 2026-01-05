"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { captalizeFirstLetter } from "@/libs/helpers/main";

export default function Breadcrumbs() {
  const pathname = usePathname();
  console.log(pathname)
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav>
      <div className="py-5 border-b">
        <h1 className="text-center">Admin Project - CRM</h1>
      </div>
      <div className="container mx-auto px-10 mt-2">

      
      <Link href="/">Home</Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");

        return (
          <span key={href}>
            {" > "}
            <Link href={href}>{captalizeFirstLetter(segment)}</Link>
          </span>
        );
      })}
      </div>
    </nav>
  );
}
