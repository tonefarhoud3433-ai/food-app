import React from "react";
import Header from "../../../Shared/Components/Header/Header";
import headerCateges from "../../../../assets/images/common/headerAllSections.png";

export default function CategoriesList() {
  return (
    <div>
      <Header
        title={
          <>
            <span className="fw-bold">Categories</span>{" "}
            <span className="fw-normal">Items</span>
          </>
        }
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerCateges}
      />
    </div>
  );
}
