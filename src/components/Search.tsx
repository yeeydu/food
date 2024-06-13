"use client";
import React, { FormEventHandler, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) return;
    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Search restaurant"
        onChange={handleChange}
        value={search}
      />
      <Button size="icon" variant="destructive" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
}
