import React, { useRef } from "react";
import Button from "./Button";
import { styled } from "styles/theme";

type TInputEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.MouseEvent<HTMLInputElement>
  | React.KeyboardEvent<HTMLInputElement>;
interface TProps {
  className?: string;
  placeholder?: string;
  search?: boolean;
  circle?: boolean;
  button?: string;
  loading?: boolean;
  onEnter?: (value: string) => void;
  onChange?: (evnet: TInputEvent) => void;
}

function Input({ button, loading, onEnter, ...props }: TProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => onEnter && inputRef.current && onEnter(inputRef.current.value);
  const handlePress = (e: React.KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && onEnter && onEnter((e.target as HTMLInputElement).value);

  if (button) {
    return (
      <SInputWrapper>
        <SInput {...props} ref={inputRef} onKeyPress={handlePress} />
        <SInputBtn>
          <Button primary block loading={loading} disabled={loading} onClick={handleClick}>
            {button}
          </Button>
        </SInputBtn>
      </SInputWrapper>
    );
  }

  return <SInput {...props} />;
}

const SInputWrapper = styled.div`
  display: flex;

  > input {
    flex: 1;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const SInputBtn = styled.div`
  > div {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const SInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.fontSizes.text};
  border: 1px solid ${({ theme }) => `${theme.colors.border}`};

  &::placeholder {
    color: ${({ theme }) => theme.colors.disabled};
  }
  &:placeholder-shown {
    text-overflow: ellipsis;
  }

  // circle
  border-radius: ${({ circle }: TProps) => (circle ? "30px" : "3px")};
  padding: ${({ circle }: TProps) => (circle ? "6px 14px" : "8px 12px")};
`;

export default Input;
