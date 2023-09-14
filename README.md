# Datadog SQS Depth Monitor

Console program that creates a Depth of Queue Alarm on a specified SQS and forwards it to a supplied Slack Channel. Assumes AWS->Datadog Integration is configured as well as a Slack->Datadog setup.

## Requirements

The program is written in TypeScript and will require:

-   [Node](https://nodejs.dev/en/)
-   [NPM](https://www.npmjs.com)

## Installation

```bash
npm i datadog-sqs-depth-monitor
```

## Usage

Preview Options

```bash
❯ datadog-sqs-depth-monitor -h
Usage: cdk-asl-definition-extractor [options]

Create a DataDog Monitor that is connected to a Slack Channel

Options:
  -V, --version           output the version number
  -q, --queue <value>     AWS SQS name to monitor depth of queue
  -r, --readable <value>  Readable name for the monitored queue
  -s, --slack <value>     Slack channel to forward alert
  -h, --help              display help for command
```

Example

```bash
datadog-sqs-depth-monitor  -q <SQS Queue Name> -r <Readable Name> -s <Slack Channel>
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
