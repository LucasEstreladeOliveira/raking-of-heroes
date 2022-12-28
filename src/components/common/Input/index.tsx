import React from "react";
import { Wrapper, Title, InputComponent } from "./styles";

type InputType = {
  title: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};
function Input({ title, value, onChange }: InputType) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <InputComponent
        title="Name"
        value={value}
        onChange={(e) => (onChange ? onChange(e) : undefined)}
      />
    </Wrapper>
  );
}

export default Input;
