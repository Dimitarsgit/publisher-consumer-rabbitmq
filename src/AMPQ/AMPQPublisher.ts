import AMPQMessageBroker, { IAssertExchange } from "./AMPQMessageBroker";

export interface IAMPQMPublishArgs {
  message: string;
  key: string;
}

class AMPQPublisher extends AMPQMessageBroker {
  constructor(exchange: IAssertExchange) {
    super(exchange);
  }

  public async publish({ message, key }: IAMPQMPublishArgs) {
    try {
      await this.assertExchange(this.exchange);
      this.channel?.publish(this.exchange.exchange, key, Buffer.from(message));
    } catch (e) {
      throw e;
    }
  }
}

export default AMPQPublisher;
