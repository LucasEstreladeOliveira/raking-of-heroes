import React from "react";
import { Wrapper, Title, CheckboxComponent } from "./styles";

type CheckboxType = {
  title: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};
function Checkbox({ title, checked, onChange }: CheckboxType) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <CheckboxComponent
        title={title}
        checked={checked}
        onChange={(e) => (onChange ? onChange(e) : undefined)}
      />
    </Wrapper>
  );
}

export default Checkbox;
