import { useEffect, useState } from "react";

import Card from "../interface/Card";
import MealItem from "./MealItem";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(process.env.REACT_APP_DB);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseObject = await response.json();
      const loadedMeals = [];

      for (const key in responseObject) {
        loadedMeals.push(
          {
            id: key,
            name: responseObject[key].name,
            description: responseObject[key].description,
            price: responseObject[key].price
          }
        );
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <section className={classes.mealsLoading}><p>Loading...</p></section>;
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>);
  }

  const mealsList = meals.map(meal =>
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  );

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
