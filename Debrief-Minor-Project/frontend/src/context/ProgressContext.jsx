import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import API from "../utils/api"; // ✅ use API

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (!user) {
      setProgress({});
      setLoading(false);
      return;
    }

    try {
      // ✅ FORCE fresh token
      const token = await user.getIdToken(true);

      const res = await API.get("/api/user/progress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProgress(res.data || {});
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);

  return (
    <ProgressContext.Provider value={{ progress, setProgress, loading }}>
      {children}
    </ProgressContext.Provider>
  );
};

// hook
// eslint-disable-next-line react-refresh/only-export-components
export const useProgress = () => useContext(ProgressContext);
