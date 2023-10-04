import { BrowserRouter, Route, Routes } from "react-router-dom";
import GraphEvolution from "./pages/GraphEvolution";
import NotFound from "./pages/NotFound";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Welcome | FLOW-DS</title>
        <meta name="description" content="FLOW-DS" />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GraphEvolution />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
