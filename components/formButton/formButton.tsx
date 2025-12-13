import { useFormStatus } from "react-dom";
import CustomButton from "../button/button";
import { JSX } from "react";

interface FormButtonProps {
  children: string | JSX.Element | JSX.Element[];
}

const FormButton = ({ children }: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <CustomButton
      bgColor="white"
      color="black"
      type="submit"
      isLoading={pending}
    >
      {children}
    </CustomButton>
  );
};

export default FormButton;
