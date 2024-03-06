import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import RoundedTransparentIconButton from "../Buttons/RoundedTransparentIconButton";
import FileCopyIcon from '@mui/icons-material/FileCopy';

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
    return files?.map((file,index) => {
      console.log(file)
        return <div key={index} className="sm:px-2 py-4 lg:px-3">
            {file.type.includes('image') && <img src={URL.createObjectURL(file)} alt="File Preview" className="w-full h-96 object-cover mb-2" />}
            {!file.type.includes('image') && <div className="w-full h-96 object-cover mb-2 flex justify-center items-center"> <FileCopyIcon style={{ fontSize: '8em' }} /> </div>}
            <p className="font-bold mb-2">{file.name}</p>
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
                <FileUploader handleChange={handleChange} name="file" />
            </div>
        }
    </div>
  );
}

export default DragDrop;