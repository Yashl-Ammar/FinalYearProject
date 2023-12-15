import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import RoundedTransparentIconButton from "../Buttons/RoundedTransparentIconButton";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop({files, setFiles, disabled}) {
  
  const handleChange = (file) => {
    setFiles(prev => {
        const newFiles = [...prev, file];
        return newFiles;
    });
  };

  console.log(files)
    
  const handleRemove = (index) => {
    setFiles((prev) => {
        const temp = [...prev];
        temp.splice(index,1);

        return temp;
    })
  };

  const mapFiles = () => {
    return files.map((file,index) => {
        return <div key={index} className="sm:px-2 py-4 lg:px-3">
            <img src={URL.createObjectURL(file)} alt="File Preview" className="w-full h-96 object-cover mb-2" />
            {disabled !== true &&
                <RoundedTransparentIconButton text='Remove' img='/Waste.svg' onClick={() => {handleRemove(index)}}/>
            }
        </div> 
    })
  }

  return (
    <div>
        <div className="grid sm:grid-cols-2 grid-cols-1">
            {mapFiles()}
        </div>
        {disabled !== true && 
            <div className="flex justify-center items-center my-8">
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            </div>
        }
    </div>
  );
}

export default DragDrop;