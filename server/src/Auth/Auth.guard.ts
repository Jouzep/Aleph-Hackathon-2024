import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ethers } from 'ethers';

type signObject = {
  signature: string;
  address: string;
  message: string;
};
@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
    const request = context.switchToHttp().getRequest();
    const data: signObject = this.extractSignatureFromHeader(request);
    if (!data) {
      throw new UnauthorizedException();
    }
    try {
      const signerAddress = ethers.utils.verifyMessage(data.message, data.signature);
      if (signerAddress !== data.address) throw new UnauthorizedException();
      request['address'] = data.address;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractSignatureFromHeader(request: Request): signObject {
    const signature: string = request.headers.signaturehash as string;
    const address: string = request.headers.address as string;
    const message: string = request.headers.message as string;
    const data: signObject = {
      signature: signature,
      address: address,
      message: message,
    } as signObject;
    return data;
  }
}
