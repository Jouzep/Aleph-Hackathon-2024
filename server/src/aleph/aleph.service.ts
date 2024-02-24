import { Injectable } from '@nestjs/common';
import { ImportAccountFromMnemonic } from 'aleph-sdk-ts/dist/accounts/ethereum';
import { Publish as publishAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';
import { dico, group, presetProducts } from '../constants/types';
import { Get as getAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';
@Injectable()
export class AlephService {
  private readonly mainAccount = ImportAccountFromMnemonic(
    'describe ring lumber clever salt like medal panther clown budget actress female',
  );
  constructor() {
    console.log('AlephService constructor');
    this.testAddPresetProduct();
  }

  async testAddPresetProduct() {
    const preset: presetProducts = {
      name: 'AirMax',
      size: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
      unit: 'eu',
      tags: ['nike', 'airmax'],
      hostDico: 'sneakers',
      price: 100,
    };
    const res = await this.addProductToDico(
      '0x593d24a4A7d637aaC285D282b78093646592aCF1',
      'sneakers',
      preset,
    );
  }
  async testFetch() {
    const res = await this.fetchAggregate(
      '0x593d24a4A7d637aaC285D282b78093646592aCF1',
      'group',
      'Merde',
    );
    console.log('res', res);
    return res;
  }
  async testDico() {
    const newDico: dico = {
      name: 'sneakers',
      owner: '0x593d24a4A7d637aaC285D282b78093646592aCF1',
      private: true,
      presetProducts: [],
    };
    const res = await this.createDico(newDico);
    console.log('res', res);
  }
  async testGroup() {
    const newGroup: group = {
      groupName: 'Merde',
      owner: '0x593d24a4A7d637aaC285D282b78093646592aCF1',
      authorized: ['0x593d24a4A7d637aaC285D282b78093646592aCF1'],
      products: [],
    };
    const res = await this.createGroup(newGroup);
  }

  async publishAgregate(address: string, name: string, content: any, type: string) {
    const key = type + '-' + name + '-' + address;
    const res = await publishAggregate({
      account: this.mainAccount,
      key: key,
      content: content,
      channel: 'TEST2405',
      address: address,
    });
    return res;
  }

  async createDico(newDico: dico) {
    const res = await this.publishAgregate(newDico.owner, newDico.name, newDico, 'dico');
    return res;
  }

  async createGroup(newGroup: group) {
    const res = await this.publishAgregate(newGroup.owner, newGroup.groupName, newGroup, 'group');
    return res;
  }

  async fetchAggregate(address: string, type: string, name: string) {
    const key = type + '-' + name + '-' + address;
    const res = await getAggregate({
      address: address,
    });
    return res[key];
  }

  async addProductToGroup() {}

  async addProductToDico(address: string, name: string, product: presetProducts) {
    const res = await this.fetchAggregate(address, 'dico', name);
    console.log('res', res);
    res.presetProducts.push(product);
    const updated = await this.publishAgregate(address, name, res, 'dico');
    // console.log('updated', updated);
  }
}
