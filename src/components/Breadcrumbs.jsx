import React from "react";
import { Link, useLocation } from "react-router-dom";
import { breadcrumbItems } from "../utils/business";
export default function Breadcrumbs() {
  const path = useLocation().pathname.replace(/\/+$/, "") || "/";
  const items = breadcrumbItems(path);
  if (items.length < 2) return null;
  return (
    <nav
      aria-label="Fil d’Ariane"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 text-sm text-stone-600"
    >
      <ol className="flex flex-wrap items-center gap-x-3">
        {items.map((item, index) => (
          <li key={item.path}>
            {index > 0 && (
              <span aria-hidden="true" className="mr-3">
                /
              </span>
            )}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link
                to={item.path}
                className="inline-flex min-h-11 items-center hover:text-[#5e7056] underline underline-offset-4"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
