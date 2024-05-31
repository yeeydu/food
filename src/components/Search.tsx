import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className="flex gap-2">
      <Input placeholder="Search restaurant" />
      <Button size="icon" className="">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
}
