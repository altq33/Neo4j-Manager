const neo4j = require("neo4j-driver");
let connected = false;
let driver;
async function connectDB(uri, user, password) {
  let result;

  try {
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    result = "DB Connected";
  } catch (error) {
    result = "Failed to connect";
    connected = false;
  } finally {
    if (result != "Failed to connect") {
      connected = true;
    }
    return result;
  }
}

async function deleteFriendship(person1Name, linkname) {
  if (!connected) {
    return {
      message: "DATABASE NOT CONNECTED",
      status: false,
    };
  }
  const session = driver.session({ database: "neo4j" });
  let result = {
    message: `Deleted link ${linkname} by the node ${person1Name}`,
    status: true,
  };
  try {
    const writeQuery = `MATCH (n:${person1Name})-[r:${linkname}]->()
      DELETE r`;

    const writeResult = await session.writeTransaction((tx) =>
      tx.run(writeQuery, { person1Name })
    );

    writeResult.records.forEach((record) => {
      const person1Node = record.get("n");

      result.message = `Deleted link ${linkname} by the node ${person1Node}`;
      result.status = true;
    });
  } catch (error) {
    result.message = `Something went wrong: ${error}`;
    result.status = false;
  } finally {
    await session.close();
    return result;
  }
}

async function createFriendship(person1Name, person2Name, link, tag1, tag2) {
  if (!connected) {
    return {
      message: "DATABASE NOT CONNECTED",
      status: false,
    };
  }
  const session = driver.session({ database: "neo4j" });
  let res = { message: "No changes records", status: true };
  try {
    const writeQuery = `MATCH (p1:${person1Name} {name:"${tag1}"} ), (p2:${person2Name} {name:"${tag2}"})
    MERGE (p1) - [:${link}] -> (p2)
    RETURN p1, p2`;

    const writeResult = await session.writeTransaction((tx) =>
      tx.run(writeQuery, { person1Name, person2Name })
    );

    writeResult.records.forEach((record) => {
      const person1Node = record.get("p1");
      const person2Node = record.get("p2");
      res.message = `Created friendship between: ${person1Node}, ${person2Node}`;
      res.status = true;
    });
  } catch (error) {
    res.message = `Something went wrong: ${error}`;
    res.status = false;
  } finally {
    await session.close();
    return res;
  }
}

async function addProp(name, label, propName, propVal) {
  if (!connected) {
    return {
      message: "DATABASE NOT CONNECTED",
      status: false,
    };
  }
  const session = driver.session({ database: "neo4j" });
  let res = {
    message: `Add ${propName} property to ${name} : ${propVal} with ${label} label`,
    status: true,
  };
  try {
    const writeQuery = `MATCH (n:${label} {name: '${name}'})
    SET n.${propName} = '${propVal}'`;

    await session.writeTransaction((tx) => tx.run(writeQuery, { name }));
  } catch (error) {
    res.message = `Something went wrong: ${error}`;
    res.status = false;
  } finally {
    await session.close();
    return res;
  }
}

async function delProp(name, label, propName) {
  if (!connected) {
    return {
      message: "DATABASE NOT CONNECTED",
      status: false,
    };
  }
  const session = driver.session({ database: "neo4j" });
  let res = {
    message: `Deleted property ${propName} by the ${name} of ${label} label`,
    status: true,
  };
  try {
    const writeQuery = `MATCH (a:${label} {name: '${name}'})
    REMOVE a.${propName}`;

    await session.writeTransaction((tx) => tx.run(writeQuery, { name }));
  } catch (error) {
    res.message = `Something went wrong: ${error}`;
    res.status = false;
  } finally {
    await session.close();
    return res;
  }
}

async function deleteNode(person1Name, nodeLabel) {
  if (!connected) {
    return {
      message: "DATABASE NOT CONNECTED",
      status: false,
    };
  }
  const session = driver.session({ database: "neo4j" });
  let res = {
    message: `Deleted ${person1Name} of ${nodeLabel} label`,
    status: true,
  };
  try {
    const writeQuery = `MATCH (node:${nodeLabel} {name:"${person1Name}"} ) 
    DETACH DELETE node`;

    await session.writeTransaction((tx) => tx.run(writeQuery, { person1Name }));
  } catch (error) {
    res.message = `Something went wrong: ${error}`;
    res.status = false;
  } finally {
    await session.close();
    return res;
  }
}

async function createPerson(person1Name, nodeLabel) {
  if (!connected) {
    return {
      message: "DATABASE NOT CONNECTED",
      status: false,
    };
  }
  const session = driver.session({ database: "neo4j" });
  let res = {
    message: `Created ${person1Name} with ${nodeLabel} label`,
    status: true,
  };
  try {
    const writeQuery = `CREATE (p:${nodeLabel} {name:"${person1Name}"} )`;

    await session.writeTransaction((tx) => tx.run(writeQuery, { person1Name }));
  } catch (error) {
    res.message = `Something went wrong: ${error}`;
    res.status = false;
  } finally {
    await session.close();
    return res;
  }
}

module.exports.createPerson = createPerson;
module.exports.createFriendship = createFriendship;
module.exports.deleteNode = deleteNode;
module.exports.deleteFriendship = deleteFriendship;
module.exports.connectDB = connectDB;
module.exports.addProp = addProp;
module.exports.delProp = delProp;
