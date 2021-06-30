import Navbar from  "./components/Navbar";
import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CreateInvoice from "./components/CreateInvoice";
import PreviewInvoice from "./components/PreviewInvoice";
import UserPanel from "./components/UserPanel";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
          <Route path="/" exact component={Dashboard}/>
          <Route path="/create-new-invoice" component={CreateInvoice}/>
          <Route path="/invoice/:id" component={PreviewInvoice}/>
          <Route path="/user" component={UserPanel}/>
        </Switch>
    </Router>
  );
}

export default App;
