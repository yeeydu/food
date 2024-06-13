import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryItemProps {
  category: Category;
}

function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link href={`/categories/${category.id}/products`}>
    <div className="flex items-center gap-3 py-3 px-4 shadow-md rounded-full">
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
      />
      <span className="font-semibold text-sm">{category.name}</span>
    </div>
    </Link>
  );
}

export default CategoryItem;
