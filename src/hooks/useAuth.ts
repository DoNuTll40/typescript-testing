import { useContext } from "react";
import AppContext from '../contexts/AppContext';

export default function useAuth() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AppProvider');
  }
  return context;
}
