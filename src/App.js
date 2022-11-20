import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import RouteComponent from "./routes/RouteComponent";
import { ToastContainer } from "react-toastify";
import { FirebaseServiceProvider } from "./firebaseServices/firebaseServices";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <FirebaseServiceProvider>
          <BrowserRouter>
            <RouteComponent />
          </BrowserRouter>
        </FirebaseServiceProvider>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
