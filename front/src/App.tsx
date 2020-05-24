import React, { Suspense } from "react";
import * as routes from "lib/variables/routes";
import { StoreProvider as Provider } from "stores";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppContainer from "components/organisms/AppContainer";
import NotFound from "components/NotFound";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <AppContainer>
          <Suspense fallback={"loading..."}>
            <Switch>
              {Object.values(routes).map((route, key) => {
                const { component, exact, path } = route;
                return <Route path={path} exact={exact} key={key} component={component} />;
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
