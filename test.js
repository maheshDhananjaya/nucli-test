var object = [];
var data;
let reslength = 0;

const sample =
  "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  //step 02 -- "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n 14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.";
  //step 03 --"14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n 14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.\n 14:28:28 Customer : Contrary to popular belief, Lorem Ipsum is not simply random text.";
  //step 04 --"14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus."
  //step 05 --"14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at 12:24:48, ut blandit lectus."
  //step 06 --"14:24:32 Luca Galasso : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Emanuele Querzola : I received the package, ut blandit lectus.";
 // "14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent I received it at 12:24:48, ut blandit lectus.";

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
  console.log(arr);
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
console.log(object);
