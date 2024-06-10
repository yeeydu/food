import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountPercentageProps {
    product: Pick<Product, 'discountPercentage'>
}

const DiscountBadge = ({product}: DiscountPercentageProps) => {
    return ( 
        <div className="flex bg-primary gap-[2px] px-2 py-[2px] rounded-full text-white items-center">
        <ArrowDownIcon size={12} />
        <span className="font-semibold text-sm">
          {product.discountPercentage}%
        </span>
      </div>
     );
}
 
export default DiscountBadge;