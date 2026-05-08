import { useEffect, useState, useMemo } from "react";
import { CategoriesAPI, FavsAPI, TagsAPI } from "../../../../api";
import NoData from "../../../Shared/Components/NoData/NoData";
import Header from "../../../Shared/Components/Header/Header";
import headerRecipes from "../../../../assets/images/common/headerAllSections.png";
import { showError, showSuccess } from "../../../../utils/toastConfig";
import FilterBar from "../../../Shared/Components/FilterBar/FilterBar";
import useFetchList from "../../../../hooks/useFetchList";
import Pagination from "../../../Shared/Components/Pagination/Pagination";

export default function FavList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(4); // العرض 4 كروت فقط
  const [filters, setFilters] = useState({
    name: "",
    tagId: "",
    categoryId: "",
  });

  const { data: allFavs, refetch } = useFetchList(FavsAPI.getFavs, {
    pageSize: 1000,
  });

  const { data: tagsList } = useFetchList(TagsAPI.getTags, { pageSize: 100 });
  const { data: categoriesList } = useFetchList(CategoriesAPI.getCategories, {
    pageSize: 100,
  });

  const filteredList = useMemo(() => {
    if (!allFavs) return [];
    return allFavs.filter((item) => {
      const matchName = item.recipe.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const matchTag = filters.tagId
        ? item.recipe.tag.id == filters.tagId
        : true;
      const matchCat = filters.categoryId
        ? item.recipe.category.some((c) => c.id == filters.categoryId)
        : true;
      return matchName && matchTag && matchCat;
    });
  }, [allFavs, filters]);

  const totalPagesCount = Math.ceil(filteredList.length / pageSize);

  const displayedList = useMemo(() => {
    const start = (pageNumber - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, pageNumber, pageSize]);

  const removeFromFav = async (id) => {
    try {
      await FavsAPI.deleteFav(id);
      showSuccess("Removed from favorites");
      refetch();
    } catch (error) {
      showError("Failed to remove");
    }
  };

  useEffect(() => {
    setPageNumber(1);
  }, [filters]);

  return (
    <div>
      <Header
        title={
          <>
            <span className="fw-bold">Favorite</span>{" "}
            <span className="fw-normal">Items</span>
          </>
        }
        desc="View and manage your favorite items easily."
        imgUrl={headerRecipes}
      />

      <FilterBar
        setFilters={setFilters}
        tagsList={tagsList}
        categoriesList={categoriesList}
        showExtraFilters={true}
      />

      <div className="container my-5">
        {displayedList.length > 0 ? (
          <>
            <div className="row g-4 mb-4">
              {displayedList.map((fav) => (
                <div key={fav.id} className="col-md-6 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                    <button
                      onClick={() => removeFromFav(fav.id)}
                      className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                      style={{ width: "35px", height: "35px", zIndex: 2 }}
                    >
                      <i className="fa-solid fa-heart text-success"></i>
                    </button>
                    <div className="img-container p-2">
                      <img
                        src={`https://upskilling-egypt.com:3006/${fav.recipe.imagePath}`}
                        className="card-img-top rounded-4"
                        alt={fav.recipe.name}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="card-body pt-0">
                      <h5 className="fw-bold mb-1">{fav.recipe.name}</h5>
                      <p className="text-muted small mb-0 text-truncate-2">
                        {fav.recipe.description || "No description available"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center">
              <Pagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalPages={totalPagesCount}
              />
            </div>
          </>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}
