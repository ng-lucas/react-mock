import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router/router.tsx";
function App() {
  const routers = createBrowserRouter(routes);

  return <RouterProvider router={routers} />;
}

export default App;
