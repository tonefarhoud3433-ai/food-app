import React from "react";

export default function RecipeForm({
  register,
  errors,
  categoriesList,
  tagsList,
  setImageFile,
  imagePreview,
  setImagePreview,
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
            <option value="">Choose Tag</option>
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
          <select
            {...register("categoriesIds", {
              required: "This Field is Required",
            })}
            className="form-control"
          >
            <option value="">Choose Category</option>
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
        <div className="my-3">
          <div
            style={{
              border: "2px dashed #28a745",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              background: "#f9f9f9",
              position: "relative",
            }}
          >
            {/* preview */}
            {imagePreview ? (
              <div style={{ position: "relative" }}>
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                />

                {/* change button */}
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Click to change image
                </p>
              </div>
            ) : (
              <>
                <i className="fa fa-upload fs-3 text-success"></i>
                <p className="mt-2 mb-0">
                  Drag & Drop or <span className="text-success">Choose</span>{" "}
                  image
                </p>
              </>
            )}

            <input
              {...register("recipeImage")}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);

                // preview instantly
                if (file) {
                  const previewUrl = URL.createObjectURL(file);
                  if (typeof window !== "undefined") {
                    setImagePreview(previewUrl);
                  }
                }
              }}
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </div>

          {errors.recipeImage && (
            <p className="text-danger mt-1">{errors.recipeImage.message}</p>
          )}
        </div>
      </>
    </>
  );
}
