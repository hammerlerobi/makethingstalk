import React from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Idle from "./components/idle";
import Step2 from "./components/step2";

function App() {
  return (
    <div className="App">
      <Router>
        <Route
          render={({ location }) => (
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route exact path="/" component={Idle} />
                <Route exact path="/step2" component={Step2} />
              </Switch>
            </AnimatePresence>
          )}
        />
      </Router>
    </div>
  );
}

export default App;

{
  /* <AnimatePresence exitBeforeEnter initial={false}></AnimatePresence> */
}
