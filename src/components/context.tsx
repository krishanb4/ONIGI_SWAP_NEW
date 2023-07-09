import React from "react";

interface MyContextValue {
  data: string;
  setData: (data: string) => void;
}

export const MyContext = React.createContext<MyContextValue>({
  data: "",
  setData: () => {},
});
