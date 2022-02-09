const { Queue, validate } = require("../models/Queue");

const getQueues = async (req, res, next) => {
  const queues = await Queue.find().sort({ createdAt: -1 }).exec();
  res.status(200).send({
    code: "success",
    message: "List of queue order by time created desc",
    data: queues,
  });
};

const createQueue = async (req, res, next) => {
  const queues = await Queue.find().sort({ createdAt: -1 }).exec();

  let currentNumber = queues[0] ? queues[0].number : "A000";
  let newNumber = incrementNumberQueue(currentNumber);

  let queue = new Queue({ number: newNumber });

  queue = await queue.save();
  res.status(200).send({
    code: "success",
    message: "Queue created",
    data: queue,
  });
};

const incrementNumberQueue = (number) => {
  var parseNumber = parseInt(number.trim().match(/\d+$/), 10);
  var letter = number.trim().match(/^[A-Za-z]/)[0];
  var newNumber = "";

  if (parseNumber >= 999) {
    parseNumber = 1;
    letter = String.fromCharCode(letter.charCodeAt(0) + 1);
    letter = letter === "[" ? "A" : letter === "{" ? "a" : letter;
  } else {
    parseNumber++;
  }

  newNumber =
    "000".substring(0, "000".length - parseNumber.toString().length) +
    parseNumber;

  return letter + newNumber.toString();
};

const deleteQueue = async (req, res, next) => {
  const queue = await Queue.findByIdAndRemove(req.params.id);
  if (!queue) {
    return res.status(401).send({
      code: "danger",
      message: "Queue not found",
    });
  }

  res.status(200).send({
    code: "success",
    message: "Queue deleted",
    data: queue,
  });
};

module.exports = {
  getQueues,
  createQueue,
  deleteQueue,
};
