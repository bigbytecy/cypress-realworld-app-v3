import detect from "detect-port";
import chalk from "chalk";

const backendPort = process.env.VITE_BACKEND_PORT || "3000";

export const getBackendPort = async (): Promise<number> => {
  if (process.env.PORT) {
    // On Render, use the injected port immediately
    const port = Number(process.env.PORT);
    console.log(chalk.green(`Using Render assigned port: ${port}`));
    return port;
  }

  // Fallback for local dev
  try {
    const _port = await detect(Number(backendPort));
    if (Number(backendPort) === _port) {
      console.log(chalk.green(`Backend server running at http://localhost:${backendPort}`));
      return Number(backendPort);
    }
    console.log(
      chalk.red(
        `Port ${backendPort} in use. Starting backend server on port ${_port}. Please update VITE_BACKEND_PORT and cypress.json accordingly.`
      )
    );
    return _port;
  } catch (err) {
    console.log(chalk.red("Error detecting port, defaulting to 3000"), err);
    return 3000;
  }
};
