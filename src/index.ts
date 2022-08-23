import { associateUserWithWallet } from './data/hasura';
import { Wallet, utils } from 'ethers';

export type TGameUserId = string | number;
export type TGameItemId = string | number;
export type TCollectionAddress = string | number;

export type TOrderId = any;

interface IOptions {
  gameDeveloperAccount?: string;
}

export type TWallet = {
  address: string;
  _signingKey: () => {
    privateKey: string;
  };
  _mnemonic: () => any;
};

const createWallet = () => {
  return Wallet.fromMnemonic(utils.entropyToMnemonic(utils.randomBytes(32)));
};

export default class NonFungibleFactory {
  gameDeveloperAccount: string | undefined;

  constructor({ gameDeveloperAccount }: IOptions) {
    this.gameDeveloperAccount = gameDeveloperAccount;
  }

  createOrder(gameUserId: TGameUserId, gameItemId: TGameItemId) {
    // TODO: port function form web app
  }
  removeOrder(gameUserId: TGameUserId, orderId: TOrderId) {
    // TODO: port function form web app
  }
  declineOrder(gameUserId: TGameUserId, orderId: TOrderId) {
    // TODO: port function form web app
  }
  redeemOrder(gameUserId: TGameUserId, orderId: TOrderId) {
    // TODO: port function form web app
  }
  initializeOrder(gameUserId: TGameUserId, orderId: TOrderId) {
    // TODO: port function form web app
  }
  acceptOrder(gameUserId: TGameUserId, orderId: TOrderId) {
    // TODO: port function form web app
  }
  getAllOrders(gameUserId: TGameUserId) {
    // TODO: port function form web app
  }
  getNftTokens(gameUserId: TGameUserId) {
    // TODO: port function form web app
  }
  associateGameItemWithToken(gameItemId: TGameItemId, collectionAddress: TCollectionAddress) {
    // TODO: mint token here and associate it with game item ID
  }
  async onUserCreated(gameUserId: TGameUserId): Promise<void> {
    console.log(this.gameDeveloperAccount);
    const wallet = createWallet();
    await associateUserWithWallet(gameUserId, wallet);
  }
}
