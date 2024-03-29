import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ImportAccountFromMnemonic } from 'aleph-sdk-ts/dist/accounts/ethereum';
import { Logger } from '@nestjs/common';
import { dico, presetProducts } from 'src/constants/types';
import { Publish as publishAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';
import { Get as getAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';

@Injectable()
export class DictionaryService {
  private readonly mainAccount = ImportAccountFromMnemonic(
    'describe ring lumber clever salt like medal panther clown budget actress female',
  );
  private readonly logger = new Logger(DictionaryService.name);

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

  async createDico(newDico: dico) {
    const res = await this.publishAggregate(newDico.owner, newDico.name, newDico, 'dico');
    if (res === undefined) this.logger.error('Error create Dico: ' + newDico.name);
    else this.logger.log('Group created: ' + newDico.name);

    return res;
  }

  async fetchAllDico(address: string) {
    try {
      const res = await getAggregate({
        address: address,
      });
      console.log('res', res);
      const dicoObjects = Object.fromEntries(
        Object.entries(res).filter(([key]) => key.startsWith('dico')),
      );
      return dicoObjects;
    } catch (e) {
      this.logger.error('Error fetch all Dico: ' + e);
      return {};
    }
  }
  async fetchAggregate(address: string, type: string, name: string) {
    try {
      const key = type + '-' + name + '-' + address;
      const res = await getAggregate({
        address: address,
      });
      return res[key];
    } catch (e) {
      this.logger.error('Error fetch Aggregate: ' + e);
      return {};
    }
  }

  async addProductToDico(address: string, name: string, product: presetProducts) {
    try {
      const res = await this.fetchAggregate(address, 'dico', name);
      console.log(res.presetProducts.length);
      const presetProductIndex = res.presetProducts.findIndex(
        (singleproduct) => product.name === singleproduct?.name,
      );
      if (presetProductIndex !== -1) {
        res.presetProducts[presetProductIndex] = product;
        await this.publishAggregate(address, name, res, 'dico');
      } else {
        res.presetProducts.push(product);
        await this.publishAggregate(address, name, res, 'dico');
      }
      this.logger.log('Product added or updated: ' + product.name);
      return;
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
  }

  async deleteProductFromDico(address: string, name: string, productName: string) {
    const res = await this.fetchAggregate(address, 'dico', name);
    const presetProductIndex = res.presetProducts.findIndex(
      (singleproduct) => productName === singleproduct.name,
    );
    console.log('presetProductIndex', presetProductIndex);
    if (presetProductIndex !== -1) {
      res.presetProducts.splice(presetProductIndex, 1);
      const updated = await this.publishAggregate(address, name, res, 'dico');
      if (updated === undefined) return false;
      this.logger.log('Product deleted: ' + productName);
      return true;
    }
    this.logger.error('Product not found: ' + productName);
    return false;
  }
}
