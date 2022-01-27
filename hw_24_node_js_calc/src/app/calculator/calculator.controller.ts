import { BadRequestError } from "../../utills/error.util";
import { Logger } from "../../utills/logger.util";
import { InputService } from "./calculator.service";

export const CalcController = class CalcController {
  constructor(
    private readonly service = new InputService(),
    private readonly logger = new Logger()
  ) {}

  async handle(argv: string): Promise<void> {
    try {
      const [method, value] = argv.split("=");
      switch (method) {
        case "show":
          if (value) {
            const id = await this.service.handleGet(value);

            this.logger.notify("Oper is found:", id);
            break;
          }

          const listAll = await this.service.handleList();
          this.logger.notify("All Oper:", listAll);

          break;

        case "clear": {
          await this.service.handleClear();
          this.logger.notify("Deleted successfully");
          break;
        }
        default:
          throw new BadRequestError();

        case "f":
          const [operation, argum] = value.split("(");
          await this.service.handleRes(argum, operation);
          this.logger.notify("Added successfully");
          break;
      }
    } catch (error) {
      this.logger.warn(error as Error);
    }
  }
};
