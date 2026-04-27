import React from "react";
import Header from "../../../Shared/Components/Header/Header";
import headerRecipes from "../../../../assets/images/common/headerAllSections.png";

export default function RecipesList() {
  return (
    <>
      <Header
        title={
          <>
            <span className="fw-bold">Recipes</span>{" "}
            <span className="fw-normal">Items</span>
          </>
        }
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerRecipes}
      />
    </>
  );
}
