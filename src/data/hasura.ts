import 'isomorphic-unfetch';
import { createClient } from '@urql/core';
import { TUniqueUserId, TWallet } from './index';

const getToken = () => 'NIwLCz3LdTwEj3RWB699OSqQq5EiygrbEUNZev6ZTTHAzhRJkHjo385hVHdzdTvU'; // Temporary

const client = createClient({
  url: 'https://nft-factory-sandbox.hasura.app/v1/graphql',
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { 'x-hasura-admin-secret': token },
    };
  },
});

const createQuery = `
  mutation Create($uniqueUserId: String!, $address: String!, $privateKey: String!, $signingKey: json!, $mnemonic: json!) {
    insert_user_wallet(
      objects: {
        uniqueUserId: $uniqueUserId,
        address: $address,
        privateKey: $privateKey,
        signingKey: $signingKey,
        mnemonic: $mnemonic 
      }
    ) {
      affected_rows
    }
  }
`;

export const associateUserWithWallet = (
  uniqueUserId: TUniqueUserId,
  wallet: TWallet
): Promise<any> => {
  const { address } = wallet;

  const signingKey = wallet._signingKey();
  const { privateKey } = signingKey;
  const mnemonic = wallet._mnemonic();

  return client
    .mutation(createQuery, {
      uniqueUserId,
      address,
      privateKey,
      signingKey,
      mnemonic,
    })
    .toPromise();
};
