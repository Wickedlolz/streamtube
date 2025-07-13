"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { loadGenres } from "@/lib/actions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const GenreDropDown = () => {
  const { data } = useQuery({
    queryKey: ["movieGenres"],
    queryFn: () => loadGenres(),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white flex items-center text-sm font-medium cursor-pointer">
        Genre <ChevronDown className="ml-1" size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-96 overflow-y-auto">
        <DropdownMenuLabel>Select a Genre</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data?.genres?.map((genre) => (
          <DropdownMenuItem key={genre?.id}>
            <Link href={`/genre/${genre?.id}?genre=${genre.name}`}>
              {genre?.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GenreDropDown;
