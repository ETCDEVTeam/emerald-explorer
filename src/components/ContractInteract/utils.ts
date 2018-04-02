import { EthRpc, contracts } from 'emerald-js';
import { OutputValue, InputValues } from 'emerald-js/src/contracts';
import { AbiFunction } from '../../store/contracts/model';

/**
 * Call Contract without creating transaction
 * Result of eth_call should be the return value of executed contract.
 */
export async function callContract(
  rpc: EthRpc, contractAddress: string, func: AbiFunction, inputs: {}): Promise<OutputValue[]> {
  const data = contracts.functionToData(func, inputs as InputValues);
  const result = await rpc.eth.call({ to: contractAddress, data });
  return contracts.dataToParams(func, result);
}