import ListItems from './../ListItems/ListItems';
import {  Route, Switch } from 'react-router-dom';
import ListItemsInFolder from './../ListItemsInFolder/ListItemsInFolder';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <ListItems/>
      </Route>
      <Route path="/:folderId">
        <ListItemsInFolder/>
      </Route>
    </Switch>
  );
}

export default App;
