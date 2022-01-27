import * as fs from "fs";
import { promisify } from "util";
import { v4 as uuid } from "uuid";
import { NotFoundError } from "../../utills/error.util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const FILE_PATH = "./operation.json";

class InputOperation {
  id: string;
  constructor(public operation: string) {
    this.id = uuid();
  }
}
type State = InputOperation[];

export const InputService = class InputService {
  async handleRes(value: string, operation: string): Promise<void> {
    const state = await this.getState();

    const [el1, el2] = value.split(",");
    const leftNum = Number(el1);
    const rightNum = Number(el2[0]);
    if (operation === "sum") {
      const result = leftNum + rightNum;
      const sum = new InputOperation(`${el1} + ${el2[0]} = ${result}`);
      state.push(sum);
    } else if (operation === "subst") {
      const result = rightNum - leftNum;
      const subst = new InputOperation(
        `${el2[0]} - ${0 - Number(el1)} = ${result}`
      );
      state.push(subst);
    } else if (operation === "mul") {
      const result = leftNum * rightNum;
      const mul = new InputOperation(`${el1} * ${el2[0]} = ${result}`);
      state.push(mul);
    } else if (operation === "div") {
      const result = leftNum / rightNum;
      const div = new InputOperation(`${el1} / ${el2[0]} = ${result}`);
      state.push(div);
    } else if (operation === "pow") {
      const result = leftNum ** rightNum;
      const pow = new InputOperation(`${el1} ** ${el2[0]} = ${result}`);
      state.push(pow);
    } else {
      throw new NotFoundError();
    }
    await this.setState(state);
  }

  async handleGet(value: string): Promise<InputOperation> {
    const state = await this.getState();

    const match = state.find((operation) => operation.id === value);
    if (!match) {
      throw new NotFoundError();
    }
    return match;
  }
  async handleList(): Promise<State> {
    const state = await this.getState();
    if (state.length < 1) {
      throw new NotFoundError();
    }
    return state;
  }

  async handleClear(): Promise<void> {
    const state = await this.getState();
    state.length = 0;
    await this.setState(state);
  }

  private async getState(): Promise<State> {
    let data = "[]";
    try {
      data = await readFile(FILE_PATH, "utf-8");
    } catch {
      await writeFile(FILE_PATH, data);
    } finally {
      return JSON.parse(data);
    }
  }

  private async setState(state: State): Promise<void> {
    try {
      await writeFile(FILE_PATH, JSON.stringify(state));
    } catch (error) {
      throw error;
    }
  }
};
