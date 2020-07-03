import React from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Idle from "./components/idle";
import TagLink from "./components/taglink";
import { Connection } from "./components/utilities/websocket";

function App() {
  //connecting to WS

  Connection();

  return (
    <div className="App">
      <Router>
        <Route
          render={({ location }) => (
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route exact path="/taglink" component={Idle} />
                <Route path="/" component={TagLink} />
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
