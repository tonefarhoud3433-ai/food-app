import React from "react";
import noDataImg from "../../../../assets/images/common/no-data.png";

export default function NoData() {
  return (
    <>
      <div className="text-center">
        <img className="img-fluid" src={noDataImg} alt="no data image" />
        <h3>No Data</h3>
        <p className="text-muted">
          are you sure you want to delete this item ? if you are sure just click
          on delete it
        </p>
      </div>
    </>
  );
}
