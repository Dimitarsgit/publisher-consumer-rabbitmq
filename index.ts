import AMPQPublisher from "./src/AMPQ/AMPQPublisher";
import AMPQConsumer from "./src/AMPQ/AMPQConsumer";
import { IAssertExchange } from "./src/AMPQ/AMPQMessageBroker";

const publisherExchange: IAssertExchange = {
  exchange: "my_topic",
  type: "topic",
  options: {
    durable: false,
  },
};

const consumerExchange: IAssertExchange = {
  exchange: "my_topic",
  type: "topic",
  options: {
    durable: false,
  },
};

(async () => {
  const ConsumerInfo = new AMPQConsumer(consumerExchange);
  const Publisher = new AMPQPublisher(publisherExchange);
  try {
    await ConsumerInfo.initialize();
    await Publisher.initialize();

    await ConsumerInfo.consume({ queue: "test_queue", pattern: "*.info" });
    console.log("Consumer is now waiting for messages.");

    await Publisher.publish({
      message: "Hello from Ivan INFO",
      key: "ivan.info",
    });

    await Publisher.publish({
      message: "Hello from Ivan TEST",
      key: "ivan.test",
    });

    await Publisher.closeConnection();
    setTimeout(() => {
      process.exit(0);
    }, 500);
  } catch (e) {
    throw e;
  }
})();
