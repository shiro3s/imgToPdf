import { useRef } from "react";

export const useImgToPdf = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return {
    inputRef
  }
}
