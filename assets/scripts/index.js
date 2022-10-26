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
      alert(data.message);
    });
};

document.querySelector("#addProp").addEventListener("click", addPropetry);

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
      alert(data.message);
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
      alert(data.message);
      if (data.message == "DB Connected") {
        popup.classList.add("close");
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
