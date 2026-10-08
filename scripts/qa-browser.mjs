import { existsSync } from "node:fs";

const urlIndex = process.argv.indexOf("--url");
export const baseURL = urlIndex >= 0 ? process.argv[urlIndex + 1] : process.env.QA_URL ?? "http://127.0.0.1:3000";
const systemChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
export const launchOptions = {
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE ?? (existsSync(systemChrome) ? systemChrome : undefined),
};
