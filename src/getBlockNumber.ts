const RPC_URL = 'https://mainnet-rpc.fibrous.finance';
export async function getBlockNumber(): Promise<number> {
  const request = {
    id: 1,
    jsonrpc: '2.0',
    method: 'starknet_blockNumber',
    params: [],
  };
  // Make the POST request
  return await fetch(RPC_URL, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => response.result);
}
