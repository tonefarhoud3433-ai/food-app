import React, { useEffect, useState } from "react";

export default function FilterBar({
  setFilters,
  tagsList = [],
  categoriesList = [],
  showExtraFilters = false, // القيمة الافتراضية "false" عشان يظهر سيرش بس
}) {
  const [name, setName] = useState("");
  const [tagId, setTagId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // بنبعت كل الفلاتر، والصفحة اللي مش محتاجة الباقي هتبعتهم قيم فاضية عادي
      setFilters({ name, tagId, categoryId });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [name, tagId, categoryId, setFilters]);

  return (
    <div className="row p-3 bg-light m-3 rounded shadow-sm align-items-center">
      {/* لو الـ extra filters مش ظاهرة، السيرش ياخد المساحة كلها (col-md-12) */}
      <div className={showExtraFilters ? "col-md-6" : "col-md-12"}>
        <input
          type="text"
          placeholder="Search by name..."
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* إظهار فلاتر التاج والكاتيجوري فقط لو الـ showExtraFilters بـ true */}
      {showExtraFilters && (
        <>
          <div className="col-md-3">
            <select
              className="form-select"
              onChange={(e) => setTagId(e.target.value)}
            >
              <option value="">Filter by Tag</option>
              {tagsList?.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Filter by Category</option>
              {categoriesList?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
}
