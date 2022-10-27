const addNode = () => {
  let name = document.querySelector("#addNodeName").value;
  let label = document.querySelector("#addNodeLabel").value;
  let data = {
    addNodeName: name,
    label: label,
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
      showPopUp(data);
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
      showPopUp(data);
    });
};

document.querySelector("#addLink").addEventListener("click", addLink);

const deleteNode = () => {
  let name1 = document.querySelector("#deleteName").value;
  let label = document.querySelector("#deleteLabel").value;
  let data = {
    deleteName: name1,
    label: label,
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
      showPopUp(data);
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
      showPopUp(data);
    });
};

document.querySelector("#df").addEventListener("click", deleteFriendship);

const addPropetry = () => {
  let name = document.querySelector("#addPropName").value;
  let label = document.querySelector("#addPropLabel").value;
  let propName = document.querySelector("#addPropProp").value;
  let propVal = document.querySelector("#addPropValue").value;
  let data = {
    name: name,
    label: label,
    propName: propName,
    propVal: propVal,
  };

  fetch("/addProp", {
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
      showPopUp(data);
    });
};

document.querySelector("#addProp").addEventListener("click", addPropetry);
const statusReq = document.querySelector(".status-req");
const delPropetry = () => {
  let name = document.querySelector("#delPropName").value;
  let label = document.querySelector("#delPropLabel").value;
  let propName = document.querySelector("#delPropProp").value;

  let data = {
    name: name,
    label: label,
    propName: propName,
  };

  fetch("/delProp", {
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
      showPopUp(data);
    });
};

document.querySelector("#delProp").addEventListener("click", delPropetry);

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
      const statusBar = document.querySelector(".status-db");
      if (data.message === "DB Connected") {
        statusBar.style.display = "flex";
        statusBar.style.color = "rgb(0, 225, 0)";
        statusBar.textContent = data.message;
        setTimeout(() => (statusBar.style.display = "none"), 2000);
        popup.classList.add("close");
      } else {
        statusBar.style.display = "flex";
        statusBar.style.color = "rgb(225, 0, 0)";
        statusBar.textContent = data.message;
        setTimeout(() => (statusBar.style.display = "none"), 2000);
      }
    });
};

document.querySelector("#req").addEventListener("click", connectDb);

const closePopUp = document.querySelector(".close-pop-up");
const openPopUp = document.querySelector(".open-db-connect-button");

closePopUp.addEventListener("click", () => {
  popup.classList.add("close");
  popup.classList.remove("open");
});
openPopUp.addEventListener("click", () => {
  popup.classList.add("open");
  popup.classList.remove("close");
});

const showPopUp = (data) => {
  if (data.status) {
    statusReq.style.display = "flex";
    statusReq.style.color = "rgb(0, 225, 0)";
    statusReq.firstChild.textContent = data.message;
    setTimeout(() => (statusReq.style.display = "none"), 2000);
    popup.classList.add("close");
  } else {
    statusReq.style.display = "flex";
    statusReq.style.color = "rgb(225, 0, 0)";
    statusReq.firstChild.textContent = data.message;
    setTimeout(() => (statusReq.style.display = "none"), 2000);
  }
};
