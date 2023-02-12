import React from "react";

interface InputProps {
  inputType: string;
  inputId: String;
  inputValue: IStage<any>;
  classStyle?: any;
  onChangeFnc?: (void) => 0;
  titleOnHover?: String; 
}
function InputComponent(props: InputProps) {
  const {
    inputType,
    inputValue,
    classStyle,
    inputId,
    onChangeFnc,
    titleOnHover,
  } = props;
  function onInputVal(e) {
    inputValue.setValue(e.target.value);
    if (onChangeFnc) {
      onChangeFnc(e);
    }
  }
  return (
    <input
        id={inputId}
        type={inputType}
        value= {inputValue.value}
        onInput={onInputVal}
        className={classStyle}
        title={titleOnHover}
      />
  );
}
export default InputComponent;
