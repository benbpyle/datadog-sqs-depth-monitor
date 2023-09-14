export class ConsoleOptions {
	private readonly _queueName: string;
	private readonly _readableQueueName: string;
	private readonly _slackChannel: string;

	constructor(queueName: string, readableQueueName: string, slack: string) {
		this._queueName = queueName.toLocaleLowerCase();
		this._readableQueueName = readableQueueName;
		this._slackChannel = slack;
	}

	get queueName(): string {
		return this._queueName;
	}

	get readableQueueName(): string {
		return this._readableQueueName;
	}

	get slackChannel(): string {
		return this._slackChannel;
	}
}
