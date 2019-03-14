import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, prettyPrint, printf } = format

export class OrderAPILogger {
  public static myFormat = printf(info => {
    return `[${info.timestamp}] [${info.level}] => ${info.message}`
  })

  public static logger = createLogger({
    level: 'info',
    format: combine(
      label({ label: 'order-api errors' }),
      timestamp(),
      OrderAPILogger.myFormat
    ),

    transports: [
      new transports.File({ filename: 'aggregated.log' }),
      new transports.Console(),
    ],
  })
}
