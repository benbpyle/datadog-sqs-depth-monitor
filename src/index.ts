#! /usr/bin/env node

import { client, v1 } from "@datadog/datadog-api-client";
import { Command } from "commander";
import { createMonitor, findMonitor } from "./monitor";
import { ConsoleOptions } from "./console-options";

const program = new Command();
program
	.version("0.0.1")
	.description(
		"Create a DataDog Monitor that is connected to a Slack Channel",
	)
	.requiredOption(
		"-q, --queue <value>",
		"AWS SQS name to monitor depth of queue",
	)
	.requiredOption(
		"-r, --readable <value>",
		"Readable name for the monitored queue",
	)
	.requiredOption("-s, --slack <value>", "Slack channel to forward alert")
	.parse(process.argv);

const options = program.opts();
const consoleOptions = new ConsoleOptions(
	options.queue,
	options.readable,
	options.slack,
);
findMonitor(consoleOptions).then((x: v1.MonitorSearchResponse) => {
	if (x.monitors && x.monitors?.length > 0) {
		console.log("Monitor already exists, moving along");
	} else {
		createMonitor(consoleOptions)
			.then(() => {
				console.log("Monitor successfully created");
			})
			.catch((error: any) => console.error(error));
	}
});
