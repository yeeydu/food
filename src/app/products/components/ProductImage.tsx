"use client"
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface ProductImageProps {
    product: Pick<Product, 'name' | 'imageUrl'>
}

// Pick from typescript selects unique fields from a object

const ProductImage = ({product}: ProductImageProps) => {

    const router = useRouter(); 

    const handleBackClick = () => router.back(); 
    
    return ( 
        <div className="relative w-full h-[360px]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
        <Button
        onClick={handleBackClick}
          className="absolute top-4 left-4 rounded-full  hover:bg-secondary hover:text-black"
          size="icon"
        >
          <ChevronLeftIcon  />
        </Button>
      </div>
     );
}
 
export default ProductImage;