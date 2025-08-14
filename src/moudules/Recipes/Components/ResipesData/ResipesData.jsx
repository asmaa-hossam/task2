import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';

export default function ResipesData() {
  let [categorylist, setcategoryList] = useState([]);
  let [tags, setTages] = useState([]);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    register('recipeImage', { required: "this filed is required" });
  }, [register]);

  const appendFormData = (data) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);
    // مهم: recipeImage أصبحت Array<File> من dropzone
    formData.append("recipeImg", data.recipeImage[0]);
    return formData;
  }

  function onsubmitt(data) {
    let recipeData = appendFormData(data);
    axios.post(`https://upskilling-egypt.com:3006/api/v1/Recipe/`, recipeData, {
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then((res) => {
        toast.success("The Recipe created successfully");
        navigate("/dashBoard/recipes");
        console.log(res);
      })
      .catch((err) => {
        toast.error("The Recipe failed to create ");
        console.log(err);
      });
  }

  function getCategory() {
    axios.get(`https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1`,
      { headers: { Authorization: localStorage.getItem('token') } }
    )
      .then((res) => {
        setcategoryList(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function getTages() {
    axios.get(`https://upskilling-egypt.com:3006/api/v1/tag/`)
      .then((res) => {
        setTages(res.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getCategory();
    getTages();
  }, []);

  const onDrop = (acceptedFiles) => {
    setValue('recipeImage', acceptedFiles, { shouldValidate: true, shouldDirty: true });
    trigger('recipeImage');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  const imageFiles = watch('recipeImage');
  const pickedName = imageFiles?.[0]?.name;

  return (
    <>
    <div className="container">
      <div className='d-flex align-items-center justify-content-center w-100 h-100'>
        <form className='p-3 w-50 ms-5' onSubmit={handleSubmit(onsubmitt)}>

          <input type="text" className='form-control my-2' placeholder='Recipe Name'
            {...register('name', { required: "this filed is required" })}
          />
          {errors.name && <div className='alert alert-danger p-0 border-0 bg-light'>{errors.name.message}</div>}

          <select className='form-control my-2'
            {...register('tagId', { required: "this filed is required" })}
          >
            <option value="">-- choose a tag --</option>
            {tags.map((tag) => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
          </select>
          {errors.tagId && <div className='alert alert-danger p-0 border-0 bg-light'>{errors.tagId.message}</div>}

          <input type="number" className='form-control my-2' placeholder='Price'
            {...register('price', { required: "this filed is required" })}
          />
          {errors.price && <div className='alert alert-danger p-0 border-0 bg-light'>{errors.price.message}</div>}

          <select className='form-control my-2'
            {...register('categoriesIds', { required: "this filed is required" })}
          >
            <option value="">-- choose a category --</option>
            {categorylist.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
          {errors.categoriesIds && <div className='alert alert-danger p-0 border-0 bg-light'>{errors.categoriesIds.message}</div>}

          <textarea className='form-control my-2' placeholder='Recipe Description'
            {...register('description', { required: "this filed is required" })}
          ></textarea>
          {errors.description && <div className='alert alert-danger p-0 border-0 bg-light'>{errors.description.message}</div>}

          <div
            {...getRootProps()}
            className='form-control mt-5 p-3'
            style={{
              border: "1px dashed rgba(0, 146, 71, 1)",
              textAlign: "center",
              cursor: "pointer",
              color: "#666",
              background: isDragActive ? "rgba(0,146,71,0.05)" : "transparent",
              minHeight: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            
            <input {...getInputProps()} />
            {pickedName
              ? <span><b>{pickedName}</b></span>
              : <span>Drag &amp; Drop or Click to Upload</span>}
          </div>

          {errors.recipeImage && (
            <div className='alert alert-danger p-0 border-0 bg-light mt-1'>
              {errors.recipeImage.message}
            </div>
          )}

          <div className="btnn d-flex justify-content-end mt-5">
            <button type="button" className='btn btn-outline-success text-success'>Cancel</button>
            <button type="submit" className='btn text-light mx-4' style={{ backgroundColor: "rgba(0, 146, 71, 1)" }}>
              Save
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  )
}
