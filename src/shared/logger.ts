import Winston, { format, transports } from 'winston'

// disable logs from winston in test env
const transportsOptions: Winston.transport[] = [
  new transports.Console({
    silent: process.env.NODE_ENV == 'test'
  })
]

const options: Winston.LoggerOptions = {
  format: format.combine(format.json(), format.timestamp(), format.colorize({ all: true })),
  transports: transportsOptions,
  exceptionHandlers: [new transports.Console({ level: 'alert' })],
  rejectionHandlers: [new transports.Console({ level: 'alert' })]
}

export const Logger = Winston.createLogger(options)
