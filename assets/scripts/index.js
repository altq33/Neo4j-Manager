const addNode = () => {
  let name = document.querySelector("#addNodeName").value;
  let data = {
    addNodeName: name,
  };
  fetch("/addNode", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      alert(data.message);
    });
};

document.querySelector("#addNode").addEventListener("click", addNode);

const addLink = () => {
  let name1 = document.querySelector("#addLinkName1").value;
  let name2 = document.querySelector("#addLinkName2").value;
  let link = document.querySelector("#addLinkName").value;
  let data = {
    addLinkName1: name1,
    addLinkName2: name2,
    addLinkName: link,
  };

  fetch("/addLink", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      alert(data.message);
    });
};

document.querySelector("#addLink").addEventListener("click", addLink);

const deleteNode = () => {
  let name1 = document.querySelector("#deleteName").value;

  let data = {
    deleteName: name1,
  };

  fetch("/deleteNode", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      alert(data.message);
    });
};

document.querySelector("#deleteNode").addEventListener("click", deleteNode);

const deleteFriendship = () => {
  let name1 = document.querySelector("#dfn").value;
  let name2 = document.querySelector("#dfl").value;

  let data = {
    deleteName: name1,
    deleteLink: name2,
  };

  fetch("/deleteFriendship", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      alert(data.message);
    });
};

document.querySelector("#df").addEventListener("click", deleteFriendship);
const popup = document.querySelector(".connect-pop-up");
const connectDb = () => {
  let uri = document.querySelector("#uri").value;
  let name = document.querySelector("#name").value;
  let password = document.querySelector("#password").value;

  let data = {
    uri: uri,
    name: name,
    password: password,
  };

  fetch("/connectDB", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      alert(data.message);
      if (data.message == "DB Connected") {
        popup.classList.add("close");
      }
    });
};

document.querySelector("#req").addEventListener("click", connectDb);

const closePopUp = document.querySelector(".close-pop-up");

closePopUp.addEventListener("click", () => popup.classList.add("close"));
