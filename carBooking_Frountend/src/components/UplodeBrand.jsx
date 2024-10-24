import React, { useEffect, useState } from "react";
import { clearInputs, inputHandler, setBrand } from "../slices/carSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchHandler } from "../utils/handlers";
import { toast } from "react-toastify";
import ButtonWithDelete from "./ButtonWithDelete";
import HashLoader from "react-spinners/HashLoader";

export default function UplodeBrand() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState("");
  const { brandInputVal, brand } = useSelector((state) => state.cars);
  async function handleSubmit(e) {
    e.preventDefault();

    if (!brandInputVal) {
      setError("brand value is required");
      return;
    }
    const formData = {
      brand: brandInputVal,
    };
    setIsLoading(true)
    const data = isEdit
      ? await fetchHandler(`/api/v1/admin/cars/brand/${editId}`, "patch", formData)
      : await fetchHandler("/api/v1/admin/cars/brand", "post", formData);
    setIsLoading(false)

    if (data.status < 400) {
      dispatch(setBrand(data.data.result));
      dispatch(clearInputs());

      toast.success(`${brandInputVal} ${isEdit ? "updated" : "added"} successfully`);
      setError("");
    } else {
      toast.error(data.response.data.msg);
    }

    setIsEdit(false)
    setEditId("");
    dispatch(clearInputs());
  }

  async function cancelHandler() {
    setEditId("");
    setIsEdit(false);
    dispatch(clearInputs());
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add a new brand
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Enter Brand Name
            </label>
            <div className="mt-2">
              <input
                id="brand"
                name="brandInputVal"
                type="text"
                required
                onChange={(e) =>
                  dispatch(
                    inputHandler({ name: e.target.name, value: e.target.value })
                  )
                }
                value={brandInputVal}
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
          </div>

          <div>
            {isLoading ? <HashLoader color="green"/> : <button
              type="submit"
              className=" flex w-full justify-center rounded-md bg-slate-500 px-3 py-1.5 my-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              {isEdit ? "update" : "Add"}
            </button>}
            {isEdit && <button onClick={cancelHandler}
              type="button"
              className="flex w-full my-4 justify-center rounded-md bg-slate-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              Cancel
            </button>}
          </div>
        </div>
      </form>
      <div className=" ml-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-4">
        {brand && brand.length>0 ?
          brand.map((item) => (
            <ButtonWithDelete item={item} key={item._id} deletePath="brand" setIsEdit={setIsEdit} setEditId={setEditId} />
          )) :<h3 className="text-3xl italic">No Brand's Available</h3>}
      </div>
    </div>
  );
}
