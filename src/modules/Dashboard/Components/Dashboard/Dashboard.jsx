import React, { useContext } from "react";
import Header from "../../../Shared/Components/Header/Header";
import headerGirl from "../../../../assets/images/common/headerGirl.png";
import RecipeHeader from "../../../Shared/Components/RecipeHeader/RecipeHeader";
import { AuthContext } from "../../../../context/AuthContext";

export default function Dashboard() {
  const { loginData } = useContext(AuthContext);
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
