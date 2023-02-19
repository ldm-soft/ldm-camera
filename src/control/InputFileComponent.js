import React, { useRef, useState } from "react";
import { CheckFile, UploadFile } from "../util/api/fileApi";

interface InputFileProps {
  inputId: String;
  inputValue: IStage<any>;
  inputFiles: IStage<any>;
  checkExist: Boolean;
  classStyle?: any;
  onChangeFnc?: (void) => 0;
  titleOnHover?: String;
  acceptFileType?: String;
  uploadOnChange?: Boolean;
}
function InputFileComponent(props: InputFileProps) {
  const {
    inputValue,
    inputFiles,
    classStyle,
    inputId,
    checkExist = false,
    onChangeFnc,
    titleOnHover,
    acceptFileType = "*.*",
    uploadOnChange = false,
  } = props;
  var inputType: string = "file";
  const inputFile = useRef(null);
  const handleFile = async (event) => {
    let fileChoose = event.target.files[0];
    var uploadFile: Boolean = false;
    var isOk: Boolean = true;
    if (!fileChoose) return;
    inputFiles.setValue(fileChoose);
    if (checkExist) {
      isOk = await CheckFile(fileChoose.name);
    }
    if (isOk) {
      inputValue.setValue(fileChoose.name);
      if (uploadOnChange) {
        await UploadFile(fileChoose);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => {
          inputFile.current.click();
        }}
      >
        Chọn File
      </button>
      <label style={{marginLeft:'5px'}}>{inputValue.value}</label>
      <input
        id={inputId}
        type={inputType}
        ref={inputFile}
        files={inputFiles.value}
        className={classStyle}
        title={titleOnHover}
        accept={acceptFileType}
        onChange={handleFile}
        style={{ display: "none" }}
      />
    </>
  );
}
export default InputFileComponent;
