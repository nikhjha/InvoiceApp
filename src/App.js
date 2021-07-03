import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import CreateInvoice from "./components/CreateInvoice";
import PreviewInvoice from "./components/PreviewInvoice";
import UserPanel from "./components/UserPanel";
import PdfGenerationProvider from "./context/PdfGenerationProvider";
import AuthProvider from "./context/AuthProvider";
const InvalidRoute = () => {
  const history = useHistory();
  useEffect(() => {
    history.push("/");
  }, [history]);
  return <div></div>;
};
function App() {
  const [toShow, setToShow] = useState(true);
  useEffect(() => {
    if (window.screen.width < 1450) {
      setToShow(false);
    }
  }, []);
  return (
    <div>
      {toShow && (
        <PdfGenerationProvider>
          
            <Router>
            <AuthProvider>
              <Navbar />
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/create-new-invoice" component={CreateInvoice} />
                <Route path="/invoice/:id" component={PreviewInvoice} />
                <Route path="/user" component={UserPanel} />
                <Route path="/" component={InvalidRoute} />
              </Switch>
              </AuthProvider>
            </Router>
          
        </PdfGenerationProvider>
      )}
      {!toShow && (
        <div className="small-screen">
          <p>Not Compatible for small view please use big screen size.</p>
        </div>
      )}
    </div>
  );
}

export default App;
