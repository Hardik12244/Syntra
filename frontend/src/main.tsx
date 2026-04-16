import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="725516390209-m499f86vj3hdg0bg0slqahaetve9omhn.apps.googleusercontent.com">
  <BrowserRouter>
  <App />
</BrowserRouter>
</GoogleOAuthProvider>
)
