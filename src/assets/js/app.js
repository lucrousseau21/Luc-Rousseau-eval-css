import Alpine from "alpinejs";
import FilterableRecipes from "./modules/FilterableRecipes";
window.alpine = Alpine;

// declare your Alpine components here...
Alpine.data('FilterableRecipes', FilterableRecipes);
Alpine.start();
