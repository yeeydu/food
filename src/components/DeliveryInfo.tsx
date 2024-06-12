import { Card } from "@radix-ui/themes";
import { BikeIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "./_helpers/Price";
import { Restaurant } from "@prisma/client";
 
interface DeliveryInfoProps{
   restaurant : Pick<Restaurant, 'deliveryFee'  | 'deliveryTimeMinutes'> 
}

const DeliveryInfo = ({restaurant}: DeliveryInfoProps) => {
    return ( 
        <Card className="flex justify-around py-2 mt-6">
        <div className="flex flex-col items-center">
          <div className="flex  items-center text-muted-foreground">
            <span className="text-xs">Delivery </span>
            <BikeIcon size={16} />
          </div>
          {Number(restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-semibold">
              {formatCurrency(Number(restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-xs font-semibold">Free</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center text-muted-foreground">
            <span className="text-xs ">Delivery Time{""}</span>
            <TimerIcon size={16} />
          </div>
            <p className="text-xs font-semibold">
              {(restaurant.deliveryTimeMinutes)} min
            </p>
        </div>
      </Card>
     );
}
 
export default DeliveryInfo;