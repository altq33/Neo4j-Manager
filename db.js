const neo4j = require("neo4j-driver");
let connected = false;
let driver;
async function connectDB(uri, user, password) {
  let result = "DB Connected";
  try {
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  } catch (error) {
    result = "Failed to connect";
  } finally {
    if (result != "Failed to connect") {
      connected = true;
    }
    return result;
  }
}

async function deleteFriendship(person1Name, linkname) {
  if (!connected) {
    return "DATABASE NOT CONNECTED";
  }
  const session = driver.session({ database: "neo4j" });
  let result = `Deleted link ${linkname} by the node ${person1Name}`;
  try {
    const writeQuery = `MATCH (n:${person1Name})-[r:${linkname}]->()
      DELETE r`;

    const writeResult = await session.writeTransaction((tx) =>
      tx.run(writeQuery, { person1Name })
    );

    writeResult.records.forEach((record) => {
      const person1Node = record.get("n");

      result = `Deleted link ${linkname} by the node ${person1Node}`;
    });
  } catch (error) {
    result = `Something went wrong: ${error}`;
  } finally {
    await session.close();
    return result;
  }
}

async function createFriendship(person1Name, person2Name, link) {
  if (!connected) {
    return "DATABASE NOT CONNECTED";
  }
  const session = driver.session({ database: "neo4j" });
  let res = "No changes records";
  try {
    const writeQuery = `MATCH (p1:${person1Name}), (p2:${person2Name})
    MERGE (p1) - [:${link}] -> (p2)
    RETURN p1, p2`;

    const writeResult = await session.writeTransaction((tx) =>
      tx.run(writeQuery, { person1Name, person2Name })
    );

    writeResult.records.forEach((record) => {
      const person1Node = record.get("p1");
      const person2Node = record.get("p2");
      res = `Created friendship between: ${person1Node}, ${person2Node}`;
    });
  } catch (error) {
    res = `Something went wrong: ${error}`;
  } finally {
    await session.close();
    return res;
  }
}

async function deleteNode(person1Name) {
  if (!connected) {
    return "DATABASE NOT CONNECTED";
  }
  const session = driver.session({ database: "neo4j" });
  let res = `Deleted ${person1Name}`;
  try {
    const writeQuery = `MATCH (node:${person1Name} ) 
    DETACH DELETE node`;

    await session.writeTransaction((tx) => tx.run(writeQuery, { person1Name }));
  } catch (error) {
    res = `Something went wrong: ${error}`;
  } finally {
    await session.close();
    return res;
  }
}

async function createPerson(person1Name) {
  if (!connected) {
    return "DATABASE NOT CONNECTED";
  }
  const session = driver.session({ database: "neo4j" });
  let res = `Created ${person1Name}`;
  try {
    const writeQuery = `CREATE (p:${person1Name} )`;
    await session.writeTransaction((tx) => tx.run(writeQuery, { person1Name }));
  } catch (error) {
    res = `Something went wrong: ${error}`;
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
