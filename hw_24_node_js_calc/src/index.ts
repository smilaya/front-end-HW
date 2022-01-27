import { CalcController } from "./app/calculator/calculator.controller";
import { InternalError } from "./utills/error.util";
import { Logger } from "./utills/logger.util";

const bootstrap = () => {
  const logger = new Logger();
  const argv = process.argv[2];
  const handleError = (err: Error = new InternalError()): void => {
    logger.warn(err);
    process.exit(1);
  };
  process.on("uncaughtException", handleError);
  process.on("unhandledRejection", handleError);
  new CalcController().handle(argv);
};

bootstrap();
