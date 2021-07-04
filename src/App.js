import React, { useEffect } from "react";
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
  return (
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
  );
}

export default App;
