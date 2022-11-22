import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import RouteComponent from "./routes/RouteComponent";
import { ToastContainer } from "react-toastify";
import { FirebaseServiceProvider } from "./firebaseServices/firebaseServices";
import { Oval } from "react-loader-spinner";

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Oval
              height={50}
              width={50}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        }
      >
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
