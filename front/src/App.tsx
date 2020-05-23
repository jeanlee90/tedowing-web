import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as routes from "lib/variables/routes";
import { StoreProvider as Provider } from "stores";
import AppContainer from "components/organisms/AppContainer";
import NotFound from "components/NotFound";
import AppLayout from "components/AppLayout";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <AppContainer>
          <Suspense fallback={"loading..."}>
            <Switch>
              {Object.values(routes).map((route, key) => {
                const { component, exact, path } = route;
                const routeCmp = <Route path={path} exact={exact} key={key} component={component} />;

                if (path === routes.HOME.path) return routeCmp;
                return <AppLayout key={key}>{routeCmp}</AppLayout>;
              })}

              {/* 404 */}
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </AppContainer>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
