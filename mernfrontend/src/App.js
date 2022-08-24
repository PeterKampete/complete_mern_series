import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainRouter from "./components/Routing/MainRouter";
import theme from "./themes/theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
