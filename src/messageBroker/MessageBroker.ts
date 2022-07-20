abstract class MessageBroker<CHANNEL, CONNECTION, EXCHANGE> {
  connection?: CONNECTION;
  channel?: CHANNEL;
  exchange: EXCHANGE;

  protected constructor(exchange: EXCHANGE) {
    this.exchange = exchange;
  }

  setConnection(conn: CONNECTION) {
    this.connection = conn;
  }

  setChannel(ch: CHANNEL) {
    this.channel = ch;
  }
}

export default MessageBroker;
