import "@testing-library/jest-dom";
import { worker } from "../mocks/worker";

beforeAll(() => worker.start());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());
