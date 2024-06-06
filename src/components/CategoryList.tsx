import { Category } from "@prisma/client";
import db from "../lib/prisma";
import React from "react";
import CategoryItem from "./CategoryItem";


export default async function CategoryList() {
  const categories = await db.category.findMany({});

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
