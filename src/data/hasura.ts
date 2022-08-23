import 'isomorphic-unfetch';
import { createClient } from '@urql/core';
import { TGameUserId, TWallet } from '../index';

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
  mutation Create($gameUserId: String!, $address: String!, $privateKey: String!, $signingKey: json!, $mnemonic: json!) {
    insert_user_wallet(
      objects: {
        gameUserId: $gameUserId,
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
  gameUserId: TGameUserId,
  wallet: TWallet
): Promise<any> => {
  const { address, _signingKey, _mnemonic } = wallet;

  const signingKey = _signingKey();
  const { privateKey } = signingKey;
  const mnemonic = _mnemonic();

  return client
    .mutation(createQuery, {
      gameUserId,
      address,
      privateKey,
      signingKey,
      mnemonic,
    })
    .toPromise();
};
