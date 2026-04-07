import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="725516390209-92mtfgptv1ko50ifthiumm1rdtlpkfib.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>
)
