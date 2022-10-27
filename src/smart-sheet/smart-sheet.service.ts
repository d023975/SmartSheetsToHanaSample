import { Injectable } from '@nestjs/common';
import { getServices } from '@sap/xsenv';
import axios from '../clients/axios.client';

@Injectable()
export class SmartSheetService {
  createJob(): unknown {
    throw new Error('Method not implemented.');
  }

  async getJobStatus(): Promise<unknown> {
    const PAPM_SERVICE_NAME =
      process.env.PAPM_SERVICE || 'papm-service-default';
    const papmService = getServices({ service: PAPM_SERVICE_NAME });
    const tokenEndpoint = ` ${papmService.service.uaa.url}/oauth/token `;
    const clientSecret = papmService.service.uaa.clientsecret;
    const clientid = papmService.service.uaa.clientid;

    const bearerPapmApi = await this.getBearer(
      tokenEndpoint,
      clientid,
      clientSecret,
    );

    const papmApiClient = axios.create({
      baseURL: papmService.service.url,
    });

    return papmService.service.url;
  }

  async getBearer(
    tokenEndpoint: string,
    clientId: string,
    clientSecret: string,
  ): Promise<string> {
    const data = JSON.stringify({
      client_id: clientId,
      grant_type: clientSecret,
    });

    const resp = await axios.post(`${tokenEndpoint}`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
      params: {
        grant_type: 'client_credentials',
      },
    });

    const token = resp.data;
    return token;
  }
}
