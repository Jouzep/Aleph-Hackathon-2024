import { Injectable } from '@nestjs/common';
import { ImportAccountFromMnemonic } from 'aleph-sdk-ts/dist/accounts/ethereum';
import { Logger } from '@nestjs/common';
import { group, product } from 'src/constants/types';
import { Get as getAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';
import { Publish as publishAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';

@Injectable()
export class GroupService {
  private readonly mainAccount = ImportAccountFromMnemonic(
    'describe ring lumber clever salt like medal panther clown budget actress female',
  );
  private readonly logger = new Logger(GroupService.name);

  async publishAggregate(address: string, name: string, content: any, type: string) {
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

  async fetchAggregate(address: string, type: string, name: string) {
    try {
      const key = type + '-' + name + '-' + address;
      const res = await getAggregate({
        address: address,
      });
      return res[key];
    } catch (e) {
      this.logger.error(e);
      return {};
    }
  }
  async createGroup(newGroup: group) {
    const res = await this.publishAggregate(newGroup.owner, newGroup.name, newGroup, 'group');
    if (res === undefined) this.logger.error('Error create Dico: ' + newGroup.name);
    else this.logger.log('Group created: ' + newGroup.name);
    return res;
  }

  async getGroups(address: string) {
    try {
      console.log(address);
      const res = await getAggregate({
        address: address,
      });
      console.log('res', res);
      const groupObjects = Object.fromEntries(
        Object.entries(res).filter(([key]) => key.startsWith('group')),
      );
      return groupObjects;
    } catch (e) {
      return {};
    }
  }

  async getGroup(address: string, name: string) {
    const res = await this.fetchAggregate(address, 'group', name);
    if (res === undefined) this.logger.error('Error fetching group: ' + name);
    else this.logger.log('Group fetched: ' + name);
    return res;
  }

  async addProductToGroup(address: string, name: string, product: product) {
    const res = await this.fetchAggregate(address, 'group', name);
    res.products.push(product);
    const updated = await this.publishAggregate(address, name, res, 'group');
    await sleep(1000);
    console.log('updated', await this.fetchAggregate(address, 'group', name));
    this.logger.log('Product added: ' + product.name);
  }

  async updateProductByIndexFromGroup(
    address: string,
    name: string,
    index: number,
    product: product,
  ) {
    const res = await this.fetchAggregate(address, 'group', name);
    res.products[index] = product;
    const updated = await this.publishAggregate(address, name, res, 'group');
    await sleep(1000);
    console.log('updated', await this.fetchAggregate(address, 'group', name));
    this.logger.log('Product updated at index: ' + index);
  }

  async deleteProductByIndexFromGroup(address: string, name: string, index: number) {
    const res = await this.fetchAggregate(address, 'group', name);
    res.products.splice(index, 1);
    const updated = await this.publishAggregate(address, name, res, 'group');
    await sleep(1000);
    console.log('deleted', await this.fetchAggregate(address, 'group', name));
    this.logger.log('Product deleted at index: ' + index);
  }

  async deleteAllProductFromGroup(address: string, name: string) {
    const res = await this.fetchAggregate(address, 'group', name);
    res.products = [];
    const updated = await this.publishAggregate(address, name, res, 'group');
    await sleep(1000);
    console.log('deleted', await this.fetchAggregate(address, 'group', name));
    this.logger.log('All products deleted from group: ' + name);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
