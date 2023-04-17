import React, { createContext, useMemo, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import "./Form.scss";

const initialValues = {
  Task: "",
  description: ""
};

const validate = (values) => {
  let errors = {};

  if (!values.Task) {
    errors.Task = "Task is required";
  }

  if (!values.description) {
    errors.description = "description is required";
  } else if (values.description.length < 4) {
    errors.description = "Password too short";
  }

  return errors;
};


const TodoForm = () => {

  const navigate = useNavigate()
  const submitForm = (values) => {
    const data = {
      title: values.Task,
      description: values.description
    };
    axios
      .post('http://127.0.0.1:8000/api/app/todo/', data)
      .then(res => {
        console.log(res)
        navigate('/TodoTable')
      })
  };
  return (

    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty
        } = formik;

        return (
          <div className="container">
            <h1 className=''>Todo Form</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="Task"
                  id="Task"
                  placeholder='title'
                  value={values.Task}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.Task && touched.Task ? "input-error" : null
                  }
                />
                {errors.Task && touched.Task && (
                  <span className="error">{errors.Task}</span>
                )}
              </div>

              <div className="form-row">
                <textarea
                  type="message"
                  name="description"
                  id="description"
                  style={{ border: "1px solid", borderRadius: "4px", height: "9rem" , resize:"none" }}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='description'
                  className={
                    errors.description && touched.description ? "input-error" : null
                  }
                />
                {errors.description && touched.description && (
                  <span className="error">{errors.description}</span>
                )}
              </div>

              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Add Todo
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default TodoForm;
