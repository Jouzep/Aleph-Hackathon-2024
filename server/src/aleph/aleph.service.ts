import { Injectable } from '@nestjs/common';
import { ImportAccountFromMnemonic } from 'aleph-sdk-ts/dist/accounts/ethereum';
import { Publish as publishAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';
import { dico, group, presetProducts, product } from '../constants/types';
import { Get as getAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';
import { Logger } from '@nestjs/common';
@Injectable()
export class AlephService {
  private readonly mainAccount = ImportAccountFromMnemonic(
    'describe ring lumber clever salt like medal panther clown budget actress female',
  );
  private readonly logger = new Logger(AlephService.name);
  constructor() {
    console.log('AlephService constructor');
    // this.testDeletePresetProduct();
  }

  async testAddPresetProduct() {
    const preset: presetProducts = {
      name: 'AirMax2',
      size: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 44, 50, 51, 53],
      unit: 'eu',
      price: 100,
    };
    const res = await this.addProductToDico(
      '0x593d24a4A7d637aaC285D282b78093646592aCF1',
      'sneakers',
      preset,
    );
  }

  async testDeletePresetProduct() {
    const res = await this.deleteProductFromDico(
      '0x593d24a4A7d637aaC285D282b78093646592aCF1',
      'sneakers',
      'AirMax',
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
      name: 'Merde',
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
    if (res === undefined) this.logger.error('Error publish Aggregate: ' + name);
    return res;
  }

  async createDico(newDico: dico) {
    const res = await this.publishAgregate(newDico.owner, newDico.name, newDico, 'dico');
    if (res === undefined) this.logger.error('Error create Dico: ' + newDico.name);
    else this.logger.log('Group created: ' + newDico.name);

    return res;
  }

  async createGroup(newGroup: group) {
    const res = await this.publishAgregate(newGroup.owner, newGroup.name, newGroup, 'group');
    if (res === undefined) this.logger.error('Error create Dico: ' + newGroup.name);
    else this.logger.log('Group created: ' + newGroup.name);
    return res;
  }

  async fetchAggregate(address: string, type: string, name: string) {
    const key = type + '-' + name + '-' + address;
    const res = await getAggregate({
      address: address,
    });
    return res[key];
  }

  async addProductToGroup(address: string, name, product: product) {
    const res = await this.fetchAggregate(address, 'group', name);
    res.products.push(product);
    const updated = await this.publishAgregate(address, name, res, 'group');
  }

  async addProductToDico(address: string, name: string, product: presetProducts) {
    const res = await this.fetchAggregate(address, 'dico', name);
    const presetProductIndex = res.presetProducts.findIndex(
      (singleproduct) => product.name === singleproduct.name,
    );
    if (presetProductIndex !== -1) {
      res.presetProducts[presetProductIndex] = product;
      await this.publishAgregate(address, name, res, 'dico');
    } else {
      res.presetProducts.push(product);
      await this.publishAgregate(address, name, res, 'dico');
    }
    this.logger.error('Product added or updated: ' + product.name);
    return true;
  }

  async deleteProductFromDico(address: string, name: string, productName: string) {
    const res = await this.fetchAggregate(address, 'dico', name);
    const presetProductIndex = res.presetProducts.findIndex(
      (singleproduct) => productName === singleproduct.name,
    );
    console.log('presetProductIndex', presetProductIndex);
    if (presetProductIndex !== -1) {
      res.presetProducts.splice(presetProductIndex, 1);
      const updated = await this.publishAgregate(address, name, res, 'dico');
      if (updated === undefined) return false;
      this.logger.log('Product deleted: ' + productName);
      return true;
    }
    this.logger.error('Product not found: ' + productName);
    return false;
  }
}
