import { Route, Routes } from "react-router-dom";

const Router = (props: RouterProps) => {
  return (
    <Routes>
      {props.routes?.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<route.component />}
        ></Route>
      ))}
    </Routes>
  );
};

export default Router;

interface RouteLink {
  path: string;
  component: React.ComponentType<any>;
  exact: Boolean;
}

interface RouterProps {
  routes: RouteLink[];
}
