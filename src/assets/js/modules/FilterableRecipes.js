export default function FilterableRecipes(jsonFile) {
  return {
    datas: [],
    filteredDatas: [],
    // pour difficulté
    recipes: [],
    filteredRecipes: [],
    difficulty: "",
    // pour affichage detail
    selectedRcp: null,
    selectedRcpIndex: null,
    // pour le suivant/précédent
    etapeActuelle: 0,
    init() {
      this.fetchDatas(jsonFile);
      // pour difficulté
      this.fetchRecipes(jsonFile);
    },

    fetchDatas(file) {
      fetch(file)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setDatas(data);
        })
        .catch((error) => {
          console.error("Erreur de chargement :", error.message);
        });
    },

    setDatas(data) {
      this.datas = data.recipes;
    },

    totalItems() {
      return this.filteredDatas.length;
    },

    // pour le tri des recettes par difficulté
    fetchRecipes(file) {
      fetch(file)
        .then((response) => response.json())
        .then((data) => {
          this.recipes = data.recipes;
          this.filteredRecipes = this.recipes;
        })
        .catch((error) =>
          console.error("Erreur de chargement des recettes:", error)
        );
    },

    filterByDifficulty() {
      if (this.difficulty === "") {
        this.filteredRecipes = this.recipes;
      } else {
        this.filteredRecipes = this.recipes.filter(
          (recipe) => recipe.difficulty === this.difficulty
        );
      }
    },

    // pour l'affichage en grand
    zoomRcp(rcpId) {
      console.log(rcpId);
      this.selectedRcp = this.recipes.find((item) => item.id === rcpId);
      this.selectedRcpIndex = rcpId;
    },

    isRcpActive() {
      return this.selectedRcp !== null;
    },

    closeRcp() {
      this.selectedRcp = null;
      this.etapeActuelle = 0;
    },
    etapeSuivante() {
      if (this.currentStep < this.selectedRcp.instructions.length - 1) {
        this.currentStep++;
      }
    },
    etapePrec() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
      // console.log(selectedRcp.instructions.etapeActuelle);
    },
  };
}
