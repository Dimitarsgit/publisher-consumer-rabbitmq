import amqp, { Channel, Connection, Options } from "amqplib";
import MessageBroker from "../messageBroker/MessageBrocker";

export interface IAssertExchange {
  exchange: string;
  type: "direct" | "topic" | "headers" | "fanout" | "match" | string;
  options?: Options.AssertExchange;
}

class AMPQMessageBroker extends MessageBroker<
  Channel,
  Connection,
  IAssertExchange
> {
  constructor(exchange: IAssertExchange) {
    super(exchange);
  }

  private async connect() {
    try {
      const connection = await amqp.connect("amqp://localhost");
      this.setConnection(connection);
    } catch (e) {
      throw e;
    }
  }
  private async createChannel() {
    if (!this.connection) {
      throw new Error(
        "You need to create a connection before trying to create a channel."
      );
    }
    try {
      const channel = await this.connection.createChannel();
      this.setChannel(channel);
    } catch (e) {
      throw e;
    }
  }

  public async initialize() {
    try {
      await this.connect();
      await this.createChannel();
    } catch (e) {
      throw e;
    }
  }

  public async closeConnection() {
    try {
      await this.channel?.close();
      await this.connection?.close();
    } catch (e) {
      throw e;
    }
  }

  public async assertExchange({ exchange, type, options }: IAssertExchange) {
    try {
      await this.channel?.assertExchange(exchange, type, options);
    } catch (e) {
      throw e;
    }
  }

  public async assertQueue({
    name,
    options,
  }: {
    name: string;
    options: Options.AssertQueue;
  }) {
    try {
      await this.channel?.assertQueue(name, options);
    } catch (e) {
      throw e;
    }
  }

  public async bindQueue({
    queue,
    exchange,
    pattern,
  }: {
    queue: string;
    exchange: string;
    pattern: string;
  }) {
    try {
      await this.channel?.bindQueue(queue, exchange, pattern);
    } catch (e) {
      throw e;
    }
  }
}

export default AMPQMessageBroker;
