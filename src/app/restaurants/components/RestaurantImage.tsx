"use client"
import {  Restaurant } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface RestaurantImageProps {
    restaurant: Pick<Restaurant, 'name' | 'imageUrl'>
}

// Pick from typescript selects unique fields from a object

const RestaurantImage = ({restaurant}: RestaurantImageProps) => {

    const router = useRouter(); 

    const handleBackClick = () => router.back(); 
    
    return ( 
        <div className="relative w-full h-[250px]">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
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
        <Button
            size="icon"
            className="absolute top-4 right-4 rounded-full b g-gray-700 hover:bg-secondary hover:text-black"
          >
            <HeartIcon size={20} className="fill-white" />
          </Button>
      </div>
     );
}
 
export default RestaurantImage;