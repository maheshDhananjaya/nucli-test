const { expect } = require("@jest/globals");
const ChatConverter = require("../ChatConverter");

test("step-01", () => {
  const sample =
    "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  expect(ChatConverter(sample)).toStrictEqual([
    {
      date: "14:24:32",
      mention: "14:24:32 Customer :",
      sentence: " Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      type: "Customer",
    },
  ]);
});

test("step-02", () => {
  const sample =
    "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.";

  expect(ChatConverter(sample)).toEqual(
    expect.arrayContaining([
      expect.objectContaining(
        {
          date: "14:24:32",
          mention: "14:24:32 Customer :",
          sentence: " Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          type: "Customer",
        },
        {
          date: "14:26:15",
          mention: "14:26:15 Agent :",
          sentence: " Aliquam non cursus erat, ut blandit lectus.",
          type: "agent",
        }
      ),
    ])
  );
});

test("step-03", () => {
  const sample =
    "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n 14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.\n 14:28:28 Customer : Contrary to popular belief, Lorem Ipsum is not simply random text.";
  expect(ChatConverter(sample)).toEqual(
    expect.arrayContaining([
      expect.objectContaining(
        {
          date: "14:24:32",
          mention: "14:24:32 Customer :",
          sentence: " Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          type: "Customer",
        },
        {
          date: "",
          mention: " 14:27:00 Customer :",
          sentence:
            " Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.",
          type: "agent",
        },
        {
          date: "14:27:47",
          mention: "14:27:47 Agent :",
          sentence: " Vestibulum tempor diam eu leo molestie eleifend.",
          type: "customer",
        },
        {
          date: "",
          mention: " 14:28:28 Customer :",
          sentence:
            " Contrary to popular belief, Lorem Ipsum is not simply random text.",
          type: "agent",
        }
      ),
    ])
  );
});

test("step-04", () => {
  const sample =
    "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.";
  expect(ChatConverter(sample)).toEqual(
    expect.arrayContaining([
      expect.objectContaining(
        {
          date: "14:24:32",
          mention: "14:24:32 Customer :",
          sentence: " Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          type: "Customer",
        },
        {
          date: "14:26:15",
          mention: "14:26:15 Agent :",
          sentence: " Aliquam non cursus erat, ut blandit lectus",
          type: "agent",
        }
      ),
    ])
  );
});

test("step-05", () => {
  const sample =
    "14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at 12:24:48, ut blandit lectus.";
  expect(ChatConverter(sample)).toEqual(
    expect.arrayContaining([
      expect.objectContaining(
        {
          date: "14:24:32",
          mention: "14:24:32 Customer :",
          sentence: " Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          type: "Customer",
        },
        {
          date: "14:26:15",
          mention: "14:26:15 Agent :",
          sentence: " I received it at 12:24:48, ut blandit lectus",
          type: "agent",
        }
      ),
    ])
  );
});

test("step-06", () => {
  const sample =
    "14:24:32 Luca Galasso : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Emanuele Querzola : I received the package, ut blandit lectus.";
  expect(ChatConverter(sample)).toEqual(
    expect.arrayContaining([
      expect.objectContaining(
        {
          date: "14:24:32",
          mention: "14:24:32 Luca Galasso :",
          sentence: " Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          type: "customer",
        },
        {
          date: "14:26:15",
          mention: "14:26:15 Emanuele Querzola :",
          sentence: " I received the package, ut blandit lectus",
          type: "agent",
        }
      ),
    ])
  );
});
