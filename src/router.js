import React from "react";
import  { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from "./home/views/App";
import Test from "./home/views/Test";

/**
 * @param p pathname
 * @param el element to render at pathname
 * @returns {{path: string, element: JSX.Element}} json object with path and string in it for createBrowserRouter
 */

const makeRoute = (p, el) => {
    return {path: p, element: el};
  };

const router = createBrowserRouter([
    makeRoute("/", <App/>),
    makeRoute("/test", <Test/>)     // for some reason wont let me use home as the name for this
]);

function SiteRouter() {
    return <RouterProvider router={router}/>; // only element that should ever be here
}
 
export default SiteRouter;