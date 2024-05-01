const fs = require("node:fs/promises");
const path = require("node:path");

// Modified to return ONLY directories,  Need async callback filter so the objects get seen (vs returned as promise)

module.exports = load;

async function load() {

  try {
    const resort_dir = `${__dirname}/resorts`;
    console.log("Process Resorts at:", resort_dir);
    const items = await fs.readdir(resort_dir, { withFileTypes: true });
    const resort_paths = await asyncFilter(items, async (item) => {
      //const temp = await fs.stat(path.resolve(resort_dir, item));
      return item.isDirectory();
    });

    const resort_nodes = resort_paths.map((id) => [
      id.name,
      {
        ["id"]: id.name,
        ...require(`./resorts/${id.name}/resort.json`),
      },
    ]);
    //console.log("resort_nodes", resort_nodes);
    return Object.fromEntries(resort_nodes);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

const asyncFilter = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));

  return arr.filter((_v, index) => results[index]);
};
