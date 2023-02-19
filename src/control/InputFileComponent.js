import React, { useRef, useState } from "react";
import { CheckFile, UploadFile } from "../util/api/fileApi";

interface InputFileProps {
  inputId: String;
  inputValue: IStage<any>;
  inputFiles: IStage<any>;
  checkExist: Boolean;
  classStyle?: any;
  onChangeFnc?: (void) => 0;
  title?: String;
  titleOnHover?: String;
  acceptFileType?: String;
  uploadOnChange?: Boolean;
  inputPath?: Boolean;
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
    title = "Chọn file",
    acceptFileType = "*.*",
    uploadOnChange = true,
    inputPath= false,
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
  function ClickButton() {
    // if(inputPath)
    // {
    //   getDir();
    // }
    // else
    // {
      inputFile.current.click();
    // }
  }
  async function getDir() {
    const dirHandle = await window.showDirectoryPicker();
    console.log(dirHandle);
    console.log(dirHandle.path)
    // run code for dirHandle
  }

  return (
    <>
      <button onClick={ClickButton}>{title}</button>
      <label style={{ marginLeft: "5px" }}>{inputValue.value}</label>
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
