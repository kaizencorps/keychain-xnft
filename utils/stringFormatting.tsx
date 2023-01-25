import { consoleLog } from "../_helpers/debug"

export const formatAddress = (address: any) => {
  if (!address) return '';
  if (typeof address == 'object') {
    // assume this is a PublicKey
    address = address.toBase58();
  }
  return `${address.substring(0, 4)}...${address.substring(address.length - 4, address.length)}`;
}
