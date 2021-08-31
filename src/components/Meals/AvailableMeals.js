import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useCallback, useState } from "react";



const AvailableMeals = () => {
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState([]);

  const mealsFetchFn = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-55fae-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Error occured!");
      }
      const data = await response.json();
      const DUMMY_MEALS = [];
      for (var key in data) {
        DUMMY_MEALS.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(DUMMY_MEALS);
      setIsLoading(false);
    } catch (error) {
      setHasError(error.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    mealsFetchFn();
  }, [mealsFetchFn]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content;

  if (isLoading) {
    content = <p>Loading...please wait</p>;
  }else if (hasError) {
    content = <p>{hasError}</p>; 
  } else {
    content = mealsList;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
