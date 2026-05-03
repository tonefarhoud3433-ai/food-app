import React from "react";
import Header from "../../../Shared/Components/Header/Header";
import headerGirl from "../../../../assets/images/common/headerGirl.png";
import RecipeHeader from "../../../Shared/Components/RecipeHeader/RecipeHeader";

export default function Dashboard({ loginData }) {
  return (
    <>
      <Header
        title={
          <>
            <span className="fw-bold">Welcome</span>{" "}
            <span className="fw-normal">{loginData?.userName}</span>
          </>
        }
        desc={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgUrl={headerGirl}
        imgClass={"w-75"}
      />
      <RecipeHeader />
    </>
  );
}
