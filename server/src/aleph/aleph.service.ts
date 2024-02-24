import { Injectable } from '@nestjs/common';
import { messages } from 'aleph-sdk-ts';
import { ImportAccountFromMnemonic } from 'aleph-sdk-ts/dist/accounts/ethereum';
import { post } from 'aleph-sdk-ts/dist/messages';
import {
  ETHAccount,
  ImportAccountFromPrivateKey,
} from 'aleph-sdk-ts/dist/accounts/ethereum';
import { PostMessage } from 'aleph-sdk-ts/dist/messages/types';
import { Publish as publishAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';
import { dico, group, presetProducts } from '../constants/types';
@Injectable()
export class AlephService {
  private readonly mainAccount = ImportAccountFromMnemonic(
    'describe ring lumber clever salt like medal panther clown budget actress female',
  );
  constructor() {
    console.log('AlephService constructor');
    // this.test();
    this.testDico();
  }

  async testDico() {
    const newDico: dico = {
      dicoName: 'Noms',
      owner: '0x593d24a4A7d637aaC285D282b78093646592aCF1',
      private: true,
    };
    const res = await this.createDico1(newDico);
  }
  // async testGroup() {
  //   const newGroup: group = {
  //     groupName: 'groupName',
  //     owner: '0x593d24a4A7d637aaC285D282b78093646592aCF1',
  //     authorized: ['0x593d24a4A7d637aaC285D282b78093646592aCF1'],
  //   };
  //   const res = await this.createGroup(newGroup);
  // }
  // async test() {
  //   const dico1: dico = {
  //     dicoName: 'Noms',
  //     owner: '0x593d24a4A7d637aaC285D282b78093646592aCF1',
  //     private: true,
  //   };
  //   const res = await this.createDico(dico1);
  //   console.log('res', res);
  // }

  // async getAccount(): Promise<ETHAccount> {
  //   const account = await ImportAccountFromMnemonic(
  //     'describe ring lumber clever salt like medal panther clown budget actress female',
  //   );
  //   return account;
  // }

  // async publishMessage(
  //   address: string,
  //   type: string,
  //   ref: string,
  //   content: any,
  // ): Promise<PostMessage<{ body: string }>> {
  //   const res = await messages.post.Publish({
  //     account: this.mainAccount,
  //     postType: type,
  //     content: content,
  //     channel: 'TEST2405',
  //     address: address,
  //     ref: ref,
  //   });
  //   return res;
  // }

  // async fetchMessages() {
  //   const fetched = await post.Get({
  //     types: 'mytypesss', // Message type of the post you want.
  //     pagination: 10, // Message per pages you want.
  //     page: 1, // Requested page.
  //     APIServer: 'https://api2.aleph.im', // Target API server to use.
  //   });
  //   return fetched;
  // }

  // async createDico(newDico: dico) {
  //   const res = await this.publishMessage(
  //     newDico.owner,
  //     'dico',
  //     'dico',
  //     newDico,
  //   );
  //   return res;
  // }

  // async createPresetProduct(newPrsetProduct: presetProducts) {
  //   // const res = await this.publishMessage(
  //   //   newDico.address,
  //   //   'dico',
  //   //   'dico',
  //   //   newDico,
  //   // );
  //   // return res;
  // }

  // async createGroup(newGroup: group) {
  //   const res = await this.publishMessage(
  //     newGroup.owner,
  //     'group',
  //     'group',
  //     newGroup,
  //   );
  //   return res;
  // }
  // async createProductIntoGroups(newPrsetProduct: presetProducts) {
  // const res = await this.publishMessage(
  //   newDico.address,
  //   'dico',
  //   'dico',
  //   newDico,
  // );
  // return res;
  // }
  async publishAgregate(
    address: string,
    name: string,
    content: any,
    type: string,
  ) {
    const key = type + '-' + name;
    const res = await publishAggregate({
      account: this.mainAccount,
      key: key,
      content: content,
      channel: 'TEST2405',
      address: address,
    });
    return res;
  }

  async createDico1(newDico: dico) {
    const res = await this.publishAgregate(
      newDico.owner,
      newDico.dicoName,
      newDico,
      'dico',
    );
    return res;
  }
}
