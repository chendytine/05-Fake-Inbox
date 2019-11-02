const hasNewMessage = () => {
  // TODO: return true with a probability of 20%.
  if (Math.random()<=0.2) {
    return true;
  } else {
    return false;
  }
};

// let gmail = [{sender:"GitHub Team", subject:"Welcome to GitHub"}, {sender:"Arnold Schwarzenegger",
//       subject:"I'm Back"}];
// const newMessage = () => {
//   // TODO: return a random message as an object with two keys, subject and sender
//   return (gmail[Math.floor(Math.random()*gmail.length)]);
// };

// function newMessage() {
//   var subjects = ["GitHub Team", "Arnold Schwarzenegger"];
//   var senders = ["Welcome to GitHub", "I'm Back"];

//   return {
//     subject: subjects[Math.floor(Math.random() * subjects.length)],
//     sender: senders[Math.floor(Math.random() * senders.length)]
//   }
// }

const newMessage = async () => {
  const response = await fetch("https://fml.shanghaiwogeng.com/api/v1/stories");
  const myJson = await response.json();
  return myJson;
}

const appendMessageToDom = (message1) => {
  // TODO: append the given message to the DOM (as a new row of `#inbox`)
  // let line1 =
// let line2 = `<div class="row message read">`+
//             `<div class="col-3">`+ gmail.sender +`</div>`+
//             `<div class="col-9">`+ gmail.subject + `</div>`+
//             `</div>`
// };
  // console.log('appending', message1)
  const list = document.querySelector("#inbox");
    list.insertAdjacentHTML("afterbegin",`<div class="row message unread">
    <div class="col-3"> ${message1.sender} </div>
    <div class="col-9"> ${message1.subject} </div>
  </div>`);
};

const refresh = async () => {
  // TODO: Implement the global refresh logic. If there is a new message,
  //       append it to the DOM. Update the unread counter in title as well.
  if (hasNewMessage()) {
    const data = await newMessage()
    // console.log("my api data", data)
    data.forEach((message2) => {
      // console.log('current message', message2)
      const mymsg = {
          sender: message2.name,
          subject: message2.text
      }
      appendMessageToDom(mymsg);
    });
};

let unread = document.querySelectorAll(".message.unread").length;
document.title = `Inbox (${unread})`;
document.querySelector("#count").innerHTML = `(${unread})`;

};



// Do not remove these lines:
document.addEventListener("DOMContentLoaded", () => {
  setInterval(refresh, 1000); // Every 1 second, the `refresh` function is called.
});

