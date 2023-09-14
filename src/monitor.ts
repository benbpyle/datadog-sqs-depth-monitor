import { client, v1 } from "@datadog/datadog-api-client";
import { Monitor } from "@datadog/datadog-api-client/dist/packages/datadog-api-client-v1";
import { ConsoleOptions } from "./console-options";

export const findMonitor = (
	consoleOptions: ConsoleOptions,
): Promise<v1.MonitorSearchResponse> => {
	const monitorName = `${consoleOptions.readableQueueName} Depth of Queue Monitor`;

	const configuration = client.createConfiguration();
	const apiInstance = new v1.MonitorsApi(configuration);
	const params: v1.MonitorsApiSearchMonitorsRequest = {
		query: monitorName,
	};

	return apiInstance.searchMonitors(params);
};

export const createMonitor = (
	consoleOptions: ConsoleOptions,
): Promise<Monitor> => {
	const message = `${consoleOptions.slackChannel} \n\n{{#is_alert}}\n(Production) ${consoleOptions.readableQueueName} Dead Letter Queue depth is high\n{{/is_alert}}\n\n{{#is_warning}}\n(Production) FHIR Engine Consumer Dead Letter Queue depth is high\n{{/is_warning}}`;
	const escalation = `${consoleOptions.slackChannel} \n\n(Production) ${consoleOptions.readableQueueName} Dead Letter Queue depth bump`;
	const query = `avg(last_5m):sum:aws.sqs.approximate_number_of_messages_visible{env:prod, queuename:${consoleOptions.queueName}} > 2`;

	const params: v1.MonitorsApiCreateMonitorRequest = {
		body: {
			name: `${consoleOptions.readableQueueName} Depth of Queue Monitor`,
			type: "query alert",
			query: query,
			message: message,
			tags: ["createdBy:automated", "env:prod"],
			priority: 1,
			options: {
				thresholds: {
					critical: 2.0,
					warning: 1.0,
					criticalRecovery: 1.0,
					warningRecovery: 0.0,
				},
				notifyAudit: false,
				requireFullWindow: false,
				notifyNoData: false,
				renotifyInterval: 30,
				includeTags: false,
				evaluationDelay: 900,
				renotifyStatuses: ["alert"],
				escalationMessage: escalation,
				newHostDelay: 300,
				silenced: {},
			},
			multi: false,
		},
	};

	const configuration = client.createConfiguration();
	const apiInstance = new v1.MonitorsApi(configuration);

	return apiInstance.createMonitor(params);
};
