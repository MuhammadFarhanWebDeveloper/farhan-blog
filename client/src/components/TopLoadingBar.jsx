import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import the nprogress styles

NProgress.configure({ showSpinner: false }); // Optional: Remove the spinner

const TopLoadingBar = () => {
  const location = useLocation();

  useEffect(() => {
    // Start NProgress on route change start
    NProgress.start();

    // Stop NProgress when the route changes
    NProgress.done();
  }, [location]);

  return null; // No UI for this component
};

export default TopLoadingBar;
