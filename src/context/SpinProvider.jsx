import { createContext, useState } from "react";
import { SpinContext } from "./SpinContext.js";

// export const SpinContext = createContext();

export const SpinProvider = ({children}) => {
  const [loading, setLoading] = useState(false)

  const startLoading = () => setLoading(true)
  
  const stopLoading = () => setLoading(false)

  return (
    <SpinContext.Provider value={{loading, startLoading, stopLoading}}>
      {children}
    </SpinContext.Provider>
  )
}