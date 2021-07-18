import React, { useState } from 'react';
import './FormStyles.css'

function Form(){

   return (
 
       <div className="form">
      <form>
        <div className="form-control">
          <label>Title</label>
          <input type="text" name="Title" />
        </div>
        <div className="form-control">
          <label>Goal</label>
          <input type="number" name="Goal" />
        </div>
        <div>
            <label>Description</label>
            <textarea  name="description" />
        </div>
        <div>
            <label>Description</label>
            <input type="file" name="description" />
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>

   )
}

export default Form;