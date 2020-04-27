import React from "react";
import { Frame, Page } from "framer";
import { motion } from "framer-motion";
import Idle from "./components/idle";

function App() {
  return (
    <div className="App">
      <Page background="red" width="100%" height="100%">
        <Idle></Idle>
        <Idle></Idle>
      </Page>
    </div>
  );
}

export default App;
