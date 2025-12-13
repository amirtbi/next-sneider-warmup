import { Button, ButtonProps } from "@chakra-ui/react";
import { JSX } from "react";

interface CustomButtonProps extends ButtonProps {
  children: string | JSX.Element | JSX.Element[];
  color?: string;
  variant?: "solid" | "outline" | "plain";
  isLoading?: boolean;
}
const CustomButton = ({
  children,
  color,
  bgColor,
  variant = "solid",
  isLoading,
  ...otherProps
}: CustomButtonProps) => {
  const DEFAULT_BUTTON_COLOR = color ?? "white";
  const DEFAULT_BUTTON_BG_COLOR = bgColor ?? "black";

  return (
    <>
      <Button
        {...otherProps}
        variant={variant}
        disabled={isLoading}
        color={DEFAULT_BUTTON_COLOR}
        bgColor={DEFAULT_BUTTON_BG_COLOR}
        borderRadius={5}
        loading={isLoading}
      >
        {children}
      </Button>
    </>
  );
};

export default CustomButton;
