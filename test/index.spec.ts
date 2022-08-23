import NonFungibleFactory from '../src';

describe('index', () => {
  describe('main', () => {
    it('should create a wallet', async () => {
      const instance = new NonFungibleFactory({ gameDeveloperAccount: '0x0123' });

      await instance.onUserCreated('7771');
    });
  });
});
