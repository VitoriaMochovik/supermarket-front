import {RouterProvider} from 'react-router-dom'
import {StoreProvider} from './store';
import {routes} from "./routes";

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <RouterProvider router={routes} />
      </div>
    </StoreProvider>

  );
}

export default App;
