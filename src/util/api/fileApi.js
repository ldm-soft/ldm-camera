import axios from "axios";
import React, { useEffect, useState } from "react";

const urlApi: string = "http://localhost:15510/api";
export const urlServerStatic = "http://localhost:15510"
export async function CheckFile(fileName: String, pathUpload: string): Boolean {
  var isOk: Boolean = false;
  await axios
    .post(
      `${urlApi}/checkFileExists`,
      {
        file: fileName,
        path: pathUpload,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      isOk = true;
    })
    .catch(function (error) {
      switch (error.response.status) {
        case 409:
          isOk = window.confirm(error.response.data.message);
          break;
      }
    });
  return isOk;
}
export async function UploadFile(fileUp: any): Boolean {
  var isOk: Boolean = false;
  const formData = new FormData();
  formData.append("myFile", fileUp);
  await axios
    .post(`${urlApi}/uploadfile`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      isOk = true;
    });
  return isOk;
}

export async function SaveTextToFile(fileName: String, bodyData: String): Boolean {
  var isOk: Boolean = false;
  await axios
    .post(
      `${urlApi}/saveTextToFile`,
      {
        filename: fileName,
        data: bodyData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      isOk = true;
    })
    .catch(function (error) {
      
    });
  return isOk;
}
interface IResult{
  isOk: Boolean,
  data: String,
  pathIMG: String
}
export async function ReadTextOfFile(fileName: String, showAlert?: Boolean =  false): IResult {
  var result : IResult = {
    isOk: false,
    data: '',
    pathIMG: ''
  };
  await axios
    .post(
      `${urlApi}/readTextOfFile`,
      {
        filename: fileName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      result = {
        isOk: res.status === 200 ,
        data: res.data.text,
        pathIMG: res.data.pathIMG,
      };
    })
    .catch(function (error) {
      console.log('error', error)
      if(error.response && error.response.status)
      {
        switch (error.response.status) {
          case 404:
            if(showAlert){window.alert(error.response.data.message);}
            break;
        }
      }
      
    });
  return result;
}
//
export async function SaveBase64ToIMG(fileName: String, bodyData: String): Boolean {
  var isOk: Boolean = false;
  await axios
    .post(
      `${urlApi}/upload/IMG`,
      {
        filename: fileName,
        data: bodyData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      isOk = true;
    })
    .catch(function (error) {
      
    });
  return isOk;
}
//
export default null;
