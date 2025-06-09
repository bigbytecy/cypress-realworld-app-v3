import detect from "detect-port";
import chalk from "chalk";

export const frontendPort = process.env.VITE_FRONTEND_PORT || "3000";
export const backendPort = process.env.VITE_BACKEND_PORT || "4000";

export const getBackendPort = async (): Promise<number | undefined> => {
  try {
    const _port = await detect(Number(backendPort));
    if (Number(backendPort) === _port) {
      console.log(chalk.green(`Backend server running at http://localhost:${backendPort}`));
      return Number(backendPort);
    }

    console.log(
      chalk.red(
        `Failed to start the backend server on port ${backendPort}.\n` +
          `Starting the backend server on port ${_port} instead.\n` +
          `Please update VITE_BACKEND_PORT in your .env and 'apiUrl' in cypress.json to ${_port}.`
      )
    );
    return _port;
  } catch (err) {
    console.log(chalk.red(`Error detecting port: ${err}`));
    return undefined;
  }
};
