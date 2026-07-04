import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import './index.css';
import App from './App.jsx';
import store, { persistor } from './redux/store.js';

const muiTheme = createTheme({
  palette: {
    primary: { main: "#137fec" },
  },
  typography: {
    fontFamily:
      '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
  },
  shape: { borderRadius: 12 },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={muiTheme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
