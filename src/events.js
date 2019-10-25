/**
 * @title Test to show all the events of the Module Registry module
 * node events.js --addr 0x70362dc2A6fC72c695EAb15A0031951F770d1239 --from 0
 */

const ethers = require("ethers");

function help() {
  console.log("Help page of events reader");
}

// function parser() {
//   process.argv.indexOf("--") > 0;
// }

async function main() {
  // Check if help options is used
  if (process.argv.indexOf("--help") > 0) {
    help();
    process.exit(0);
  }

  // Read Command Line Arguments
  let idx = process.argv.indexOf("--url");
  const provider = new ethers.providers.JsonRpcProvider(
    idx < 0 ? "http://localhost:8545" : process.argv[idx + 1]
  );

  // Contract address
  idx = process.argv.indexOf("--addr");
  const contract_address = process.argv[idx + 1];

  // From block
  idx = process.argv.indexOf("--from");
  const fromBlock = idx < 0 ? 0 : parseInt(process.argv[idx + 1]);

  // To block
  // Defaults to undefined to scan all blocks
  idx = process.argv.indexOf("--to");
  const toBlock = idx < 0 ? undefined : parseInt(process.argv[idx + 1]);

  // Get all the logs
  const logs = await provider.getLogs({
    // Get the events from the Module Registry contract
    address: contract_address,
    fromBlock,
    toBlock,
  });

  console.log(logs);

  const datas = logs.map((log) => log.data);

  console.log(
    datas.map((data) => {
      try {
        console.log("Data is:", data);
        return ethers.utils.parseBytes32String(data);
      } catch (err) {
        console.log(err);
      }
    })
  );
}

main();
