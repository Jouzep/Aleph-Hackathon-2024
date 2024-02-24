import { Injectable } from '@nestjs/common';
import { messages } from 'aleph-sdk-ts';
import { ImportAccountFromMnemonic } from 'aleph-sdk-ts/dist/accounts/ethereum';
import {
  ETHAccount,
  ImportAccountFromPrivateKey,
} from 'aleph-sdk-ts/dist/accounts/ethereum';
import { PostMessage } from 'aleph-sdk-ts/dist/messages/types';
@Injectable()
export class AlephService {
  constructor() {
    console.log('AlephService constructor');
    this.test();
  }

  async test() {
    const account = await this.getAccount();
    console.log('account', account);
    const res = await this.publishMessage(account);
    console.log('res', res);
  }
  async getAccount(): Promise<ETHAccount> {
    const account = await ImportAccountFromMnemonic(
      'describe ring lumber clever salt like medal panther clown budget actress female',
    );
    // const key =
    //   'xprv9ygc1QEEAP5n6ksUfqRx89CLWEH3PAy3BsCmoR8Ch94juX3Kb6f3i9TVvyoTqBidFYFvye7twoNTBgcnVEfFkzfo7wLmkkYvvnnNzfUVBqx';
    // const account = await ImportAccountFromPrivateKey(key);
    return account;
  }

  async publishMessage(
    account: ETHAccount,
  ): Promise<PostMessage<{ body: string }>> {
    const res = await messages.post.Publish({
      account: account,
      postType: 'mytype',
      content: { body: 'content of my post' },
      channel: 'TEST2405',
    });
    return res;
  }
}
