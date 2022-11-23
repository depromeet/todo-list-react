import { setupWorker } from "msw";
import { todoHandlers } from "./todoHandler";

export const worker = setupWorker(...todoHandlers);
