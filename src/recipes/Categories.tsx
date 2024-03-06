import { useState, useEffect } from "react";
import { getCategories } from "../services/apiFacade";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import { addCategory } from "../services/apiFacade";

export const Categories = () => {
  const [categories, setCategories] = useState<Array<string>>();
  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newCategory = { name: ((e.target as HTMLFormElement).elements.namedItem("name") as HTMLInputElement)?.value };
    console.log(newCategory);
    const updatedCategories = await addCategory(newCategory);
    setCategories(updatedCategories);
  }
  return (
    <>
      <h2>Categories</h2>
      <p>Browse recipes by category.</p>
      {/* if the user is logged in as admin, allow them to create a new category through a form on the page */}
      {useAuth().isLoggedInAs(["ADMIN"]) ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="New category" />
          <button type="submit">Add</button>
        </form>
      ) : (
        "not logged in as admin"
      )}
      <ul>
        {categories?.map((category) => (
          <li key={category}>
            {/* {category} */}
            <Link to={`/recipes?category=${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const Desktops = () => <h3>Desktop PC Page</h3>;
export const Laptops = () => <h3>Laptops Page</h3>;
