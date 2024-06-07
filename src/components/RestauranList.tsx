import db from '../lib/prisma';
import RestaurantItem from './RestaurantItem';

const RestaurantList =  async () => {

// get restaurant with the highest requests
 const restaurants = await db.restaurant.findMany({ take: 10 });

    return ( 
        <div className="flex overflow-x-scroll gap-4 px-5 [&:: -webkit-scrollbar]:hidden ">
        {restaurants.map((restaurant) => (
          <RestaurantItem restaurant={restaurant} key={restaurant.id} />
        ))} 
      </div>
     );
}
 
export default RestaurantList;