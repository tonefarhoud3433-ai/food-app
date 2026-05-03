import React from "react";

export default function RecipeForm({
  register,
  errors,
  categoriesList,
  tagsList,
  setImageFile,
}) {
  return (
    <>
      <>
        <div className="input-group my-2">
          <input
            {...register("name", { required: "Name is Required" })}
            type="text"
            className="form-control"
            placeholder="Recipe Name"
          />
        </div>
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
        <div className="input-group my-2">
          <select
            {...register("tagId", { required: "Tag is Required" })}
            className="form-control"
          >
            <option value=""></option>
            {tagsList?.map((tag) => (
              <option key={tag?.id} value={tag?.id}>
                {tag?.name}
              </option>
            ))}
          </select>
        </div>
        {errors.tagId && <p className="text-danger">{errors.tagId.message}</p>}
        <div className="input-group my-2">
          <input
            {...register("price", { required: "Price is Required" })}
            type="number"
            className="form-control"
            placeholder="Price"
          />
        </div>
        {errors.price && <p className="text-danger">{errors.price.message}</p>}
        <div className="input-group my-2">
          <select {...register("categoriesIds")} className="form-control">
            <option value=""></option>
            {categoriesList.map((category) => (
              <option key={category?.id} value={category?.id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>
        {errors.categoriesIds && (
          <p className="text-danger">{errors.categoriesIds.message}</p>
        )}
        <div className="input-group my-2">
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            type="text"
            className="form-control"
            placeholder="Description"
          ></textarea>
        </div>
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
        <div className="input-group my-2">
          <input
            {...register("recipeImage")}
            type="file"
            className="form-control"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
            }}
          />
        </div>
        {errors.recipeImage && (
          <p className="text-danger">{errors.recipeImage.message}</p>
        )}
      </>
    </>
  );
}
