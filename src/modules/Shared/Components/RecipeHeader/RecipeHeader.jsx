import { useNavigate } from "react-router-dom";

export default function RecipeHeader() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="container-fluid">
          <div className="row recipe-header align-items-center justify-content-between px-5 py-4 m-3 rounded rounded-4">
            <div className="col-md-8">
              <h5>
                Fill the <strong className="text-success">Recipes</strong> !
              </h5>
              <p>
                you can now fill the meals easily using the table and form ,
                click here and sill it with the table !
              </p>
            </div>
            <div className="col-md-4 text-center">
              <button
                onClick={() => navigate("/dashboard/recipes")}
                className="btn btn-success px-4"
              >
                All Recipes <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
