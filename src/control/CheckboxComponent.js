import React from "react";
interface InputProps {
  hasTitle: Boolean;
  title?: string;
  inputId: String;
  inputValue: IStage<any>;
  classStyle?: any;
  onChangeFnc?: (void) => 0;
}
function CheckboxComponent(props: InputProps) {
  const {
    hasTitle,
    title,
    inputValue,
    classStyle,
    inputId,
    onChangeFnc,
  } = props;
  const inputType ='checkbox';
  function onInputVal(e) {
    inputValue.setValue(!e.target.checked);
    if (onChangeFnc) {
      onChangeFnc(e);
    }
  }
  return (
    <>
      <input
        id={inputId}
        type={inputType}
        onInput={onInputVal}
        checked={inputValue.value}
        className={classStyle}
      />
      <label for={inputId}>{title}</label>
    </>
  );
}
export default CheckboxComponent;
