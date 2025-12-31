export function FavoritesFoods() {
  const foods = ["Pizza", "Burger", "Sushi", "Pasta", "Tacos"];

  return (
    <ul>
       {foods.map((food,index)=>(
<p>{index+1} {food}</p>
       ))}
    </ul>
  );
}

