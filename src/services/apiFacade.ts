import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const CATEGORIES_URL = API_URL + "/categories";
const RECIPE_URL = API_URL + "/recipes";
const INFO_URL = API_URL + "/info";
const CACHE_TIME = 1 * 60 * 1000; // 5 min cache
const LAST_FETCH = { categories: 0, recipes: 0, info: 0 };

interface Recipe {
  id: number | null;
  name: string;
  category: string;
  instructions: string;
  thumb: string;
  youTube: string;
  ingredients: string;
  source: string;
}

interface Info {
  reference: string;
  created: string;
  info: string;
}

// interface Category {
//   recipes: Array<Recipe>;
//   created: string;
//   edited: string;
// id: number;
// name: string;}

let categories: Array<string> = [];
let info: Info | null = null;
let recipes: Array<Recipe> = [];

async function getCategories(): Promise<Array<string>> {
  if (categories.length > 0) return [...categories];
  // const res = await fetch("http://localhost:8080/categories");
  // console.log(res,"res");
  
  // const result = await res.json()
  // console.log("GETTING CATEGORIES",result);
  
  const res = await fetch(CATEGORIES_URL).then(handleHttpErrors);
  categories = [...res];
  console.log("result", res);
  console.log("categories", categories);

  return res;
}
async function getRecipes(category: string | null): Promise<Array<Recipe>> {
  // if (recipes.length > 0) return recipes;
  console.log("category", category);
  const queryParams = category ? "?category=" + category : "";
  const res = await fetch(RECIPE_URL + queryParams).then(handleHttpErrors);
  recipes = [...res];
  console.log("recipes", recipes);

  return res;
}
async function getRecipe(id: number): Promise<Recipe> {
  //if (recipes.length > 0) return [...recipes];
  return fetch(RECIPE_URL + "/" + id).then(handleHttpErrors);
}
async function addRecipe(newRecipe: Recipe): Promise<Recipe> {
  const method = newRecipe.id ? "PUT" : "POST";
  const options = makeOptions(method, newRecipe, true);
  const URL = newRecipe.id ? `${RECIPE_URL}/${newRecipe.id}` : RECIPE_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

async function deleteRecipe(id: number): Promise<Recipe> {
  const options = makeOptions("DELETE", null, true);
  return fetch(`${RECIPE_URL}/${id}`, options).then(handleHttpErrors);
}

async function addCategory(newCategory: { name: string }): Promise<Array<string>> {
  const options = makeOptions("POST", newCategory, true);
  return fetch(CATEGORIES_URL, options).then(handleHttpErrors);
}

async function getInfo(): Promise<Info> {
  if (info) return info;
  const res = await fetch(INFO_URL).then(handleHttpErrors);
  info = { ...res };
  return res;
}

export type { Recipe, Info };
// eslint-disable-next-line react-refresh/only-export-components
export { getCategories, getRecipes, getRecipe, addRecipe, deleteRecipe, getInfo, addCategory };
