import React from "react";
import Header from "../../../Shared/Components/Header/Header";
import headerUsers from "../../../../assets/images/common/headerAllSections.png";
export default function UsersList() {
  return (
    <div>
      <Header
        title={
          <>
            <span className="fw-bold">Users</span>{" "}
            <span className="fw-normal">List</span>
          </>
        }
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerUsers}
      />
    </div>
  );
}
