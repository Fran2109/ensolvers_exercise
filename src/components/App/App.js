import ListItems from './../ListItems/ListItems';
import {  Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/Login">
          
      </Route>
      <Route path="/Ensolvers">
        <ListItems/>
      </Route>
    </Switch>
  );
}

export default App;
