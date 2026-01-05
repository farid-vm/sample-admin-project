"use client";

import { usePathname } from "next/navigation";
import { captalizeFirstLetter } from "@/libs/helpers/main";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return (
    <nav>
      <div className="py-5 border-b">
        <h1 className="text-center">Admin Project - CRM</h1>
      </div>
      <div className="container mx-auto px-10 mt-2">

      
      <a href="/">Home</a>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");

        return (
          <span key={href}>
            {" > "}
            <a href={href}>{captalizeFirstLetter(segment)}</a>
          </span>
        );
      })}
      </div>
    </nav>
  );
}
