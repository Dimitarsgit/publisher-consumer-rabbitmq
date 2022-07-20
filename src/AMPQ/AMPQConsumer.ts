import AMPQMessageBroker, { IAssertExchange } from "./AMPQMessageBroker";

export interface IAMPQMConsumeArgs {
  queue: string;
  pattern: string;
}

class AMPQConsumer extends AMPQMessageBroker {
  exchange: IAssertExchange;
  constructor(exchange: IAssertExchange) {
    super(exchange);
    this.exchange = exchange;
  }

  public async consume({ queue, pattern = "" }: IAMPQMConsumeArgs) {
    try {
      await this.assertExchange(this.exchange);
      await this.assertQueue({ name: queue, options: { exclusive: true } });
      await this.bindQueue({
        queue,
        exchange: this.exchange.exchange,
        pattern,
      });
      await this.channel?.consume(queue, (msg) => {
        console.log(`Message consumed: ${msg?.content}`);
      });
    } catch (e) {
      throw e;
    }
  }
}

export default AMPQConsumer;
