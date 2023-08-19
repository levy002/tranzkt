import React from "react";
import { useForm } from "react-hook-form";




export const CategoryForm = ({ handleCategorySubmission, isLoading }) => {
  const { register, handleSubmit, resetField } = useForm();

  const onSubmit = (data) => {
    handleCategorySubmission(data);
    resetField("name");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 items-center mt-2"
      >
        <div className="w-8/12">
          <input
            type="text"
            {...register("name")}
            placeholder="Category name"
            className="w-full"
            required
          />
        </div>

        <div className="self-center align-middle border-yellow-300">
          {isLoading ? (
            <button
            type="submit"
            className=" w-20 border border-gray-600 rounded px-3 bg-gray-600 text-slate-100"
          >
            Saving...
          </button>
          ) : (
            <button
            type="submit"
            className=" w-20 border border-green-600 rounded px-3 bg-green-600 text-slate-100"
          >
            Save
          </button>
          )}
        </div>
      </form>
    </div>
  );
};

export const SubCategoryForm = ({ handleSubCategorySubmission, isLoading }) => {
  const { register, handleSubmit, resetField } = useForm();
  const onSubmit = (data) => {
    handleSubCategorySubmission(data);
    resetField("name");
  };


  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 items-center mt-2"
      >
        <div className="w-8/12">
          <input
            type="text"
            {...register("name")}
            placeholder="SubCategory name"
            className="w-full"
            required
          />
        </div>

        <div className="self-center align-middle border-yellow-300">
        {isLoading ? (
            <button
            type="submit"
            className=" w-20 border border-gray-600 rounded px-3 bg-gray-600 text-slate-100"
          >
            Saving...
          </button>
          ) : (
            <button
            type="submit"
            className=" w-20 border border-green-600 rounded px-3 bg-green-600 text-slate-100"
          >
            Save
          </button>
          )}
        </div>
      </form>
    </div>
  );
};
