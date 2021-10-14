var object = [];
var data;
let reslength = 0;

const ChatConverter = (sample) => {
  if (sample.includes("\n")) {
    data = sample.split("\n");
    reslength = data.length;
  } else {
    data = sample.split(".");
    reslength = data.length - 1;
  }
  
  for (let i = 0; i < reslength; i++) {
    let sent = data[i].split(":");
    let arr = data[i].split(" ");
    object = [
      ...object,
      {
        date: arr[0], //'14:24:32',
        mention:
          arr[0] +
          " " +
          arr[1] +
          " " +
          (arr[2] === ":" ? arr[2] : arr[2] + " " + arr[3]), //'14:24:32 Customer : ',
        sentence:
          sent.length > 4 ? sent[3] + ":" + sent[4] + ":" + sent[5] : sent[3], //'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type:
          arr[1] === ("Customer" || "Agent")
            ? arr[1]
            : i % 2 === 0
            ? "customer"
            : "agent", //'customer'
      },
    ];
  }
  return object;
}

module.exports = ChatConverter;






