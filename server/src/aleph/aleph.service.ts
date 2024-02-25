import { Injectable } from '@nestjs/common';
import { ImportAccountFromMnemonic } from 'aleph-sdk-ts/dist/accounts/ethereum';
import { Publish as publishAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';
import { dico, group, presetProducts, product } from '../constants/types';
import { Get as getAggregate } from 'aleph-sdk-ts/dist/messages/aggregate';
import { Logger } from '@nestjs/common';
import { DictionnaryService } from 'src/dictionnary/dictionnary.service';
import { GroupService } from 'src/group/group.service';
@Injectable()
export class AlephService {
  private readonly mainAccount = ImportAccountFromMnemonic(
    'describe ring lumber clever salt like medal panther clown budget actress female',
  );
  private readonly logger = new Logger(AlephService.name);
  constructor(
    private readonly Dico: DictionnaryService,
    private readonly Group: GroupService,
  ) {
    console.log('AlephService constructor');
    // this.testUpdateProductToGroup();
  }

  // async testDeleteAllProductFromGroup() {
  //   const res = await this.deleteAllProductFromGroup(
  //     '0x593d24a4A7d637aaC285D282b78093646592aCF1',
  //     'Merde',
  //   );
  // }
  // async testAddProductToGroup() {
  //   const product: product = {
  //     name: 'AirMax',
  //     description: 'Nike AirMax 2021',
  //     price: 100,
  //     size: 44,
  //     state: 'En stock',
  //     quantity: 10,
  //   };
  //   const res = await this.addProductToGroup(
  //     '0x593d24a4A7d637aaC285D282b78093646592aCF1',
  //     'Merde',
  //     product,
  //   );
  // }

  // async testUpdateProductToGroup() {
  //   const product: product = {
  //     name: 'AirMaxUpdated',
  //     description: 'Nike AirMax 2021',
  //     price: 100,
  //     size: 44,
  //     state: 'En stock',
  //     quantity: 10,
  //   };
  //   const res = await this.updateProductByIndexFromGroup(
  //     '0x593d24a4A7d637aaC285D282b78093646592aCF1',
  //     'Merde',
  //     0,
  //     product,
  //   );
  // }
  // async testDeleteProductFromGroup() {
  //   const res = await this.deleteProductByIndexFromGroup(
  //     '0x593d24a4A7d637aaC285D282b78093646592aCF1',
  //     'Merde',
  //     2,
  //   );
  // }
  // async testAddPresetProduct() {
  //   const preset: presetProducts = {
  //     name: 'AirMax2',
  //     size: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 44, 50, 51, 53],
  //     unit: 'eu',
  //     price: 100,
  //   };
  //   const res = await this.addProductToDico(
  //     '0x593d24a4A7d637aaC285D282b78093646592aCF1',
  //     'sneakers',
  //     preset,
  //   );
  // }

  // async testDeletePresetProduct() {
  //   const res = await this.deleteProductFromDico(
  //     '0x593d24a4A7d637aaC285D282b78093646592aCF1',
  //     'sneakers',
  //     'AirMax',
  //   );
  // }
  // async testFetch() {
  //   const res = await this.fetchAggregate(
  //     '0x593d24a4A7d637aaC285D282b78093646592aCF1',
  //     'group',
  //     'Merde',
  //   );
  //   console.log('res', res);
  //   return res;
  // }
  // async testDico() {
  //   const newDico: dico = {
  // name: 'sneakers',
  // owner: '0x593d24a4A7d637aaC285D282b78093646592aCF1',
  // private: true,
  // presetProducts: [],
  //   };
  //   const res = await this.createDico(newDico);
  //   console.log('res', res);
  // }
  // async testGroup() {
  //   const newGroup: group = {
  //     name: 'Merde',
  //     owner: '0x593d24a4A7d637aaC285D282b78093646592aCF1',
  //     authorized: ['0x593d24a4A7d637aaC285D282b78093646592aCF1'],
  //     products: [],
  //   };
  //   const res = await this.createGroup(newGroup);
  // }

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
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
