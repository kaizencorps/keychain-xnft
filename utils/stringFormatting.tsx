import { consoleLog } from "_helpers/debug"

export const formatAddress = (address: any) => {
  if (!address) return '';
  if (typeof address == 'object') {
    // assume this is a PublicKey
    address = address.toBase58();
  }
  return `${address.substring(0, 4)}...${address.substring(address.length - 4, address.length)}`;
}

// test that a username is alphanumeric with dashes or underscores
export const validateUsername = (name: string) => {
  const regex = /^[a-z0-9_\-]+$/i;
  return regex.test(name);
}
