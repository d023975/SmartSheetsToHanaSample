import { Injectable } from '@nestjs/common';
import { getServices } from '@sap/xsenv';
import axios from '../clients/axios.client';

@Injectable()
export class SmartSheetService {
  async getReports(id: string): Promise<unknown> {
    const token = process.env.BEARER_TOKEN;
    const endpoint = process.env.SMART_SHEET_ENDPOINT;

    if (!(token && endpoint)) return 'Missing env vars';

    const resp = await axios.get(`${endpoint}/reports/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return resp.data;
  }
  createJob(): unknown {
    throw new Error('Method not implemented.');
  }

  async getJobStatus(): Promise<unknown> {
    //>>> Calls to PaPM Backend to retrieve whatever you want via API via destination
    const result2 =
      await this.sampleGetDataViaAPIAndGetAPIDetailsFromDestination();

    //>>> Calls to PaPM Backend to retrieve whatever you want via API via bound Environment
    const result1 = await this.sampleGetDataViaAPI();
    const sampleResult = await this.sampleGetDataBaseConnectionViaAPI();
    return result1;
  }

  async sampleGetDataViaAPI(): Promise<unknown> {
    const { papmService, bearerPapmApi } = await this.getPaPMApiToken();

    const resp = await axios.get(
      `https://${papmService.service.url}/sap/opu/odata/NXI/P1_N_MOD_SRV/ENVVSet`,
      {
        headers: {
          Authorization: `Bearer ${bearerPapmApi.access_token}`,
        },
      },
    );

    return resp.data;
  }

  async sampleGetDataViaAPIAndGetAPIDetailsFromDestination(): Promise<unknown> {
    //get Destination Toke
    const { destinationService, bearerDestinationApi } =
      await this.getDestinationToken();
    // READ Destination

    // USE Destination

    const destName = process.env.EXTERNAL_DESTINATION_NAME || 'papm-cloud-api';

    const resp = await axios.get(
      `${destinationService.service.uri}/destination-configuration/v1/subaccountDestinations/${destName}`,
      {
        headers: {
          Authorization: `Bearer ${bearerDestinationApi.access_token}`,
        },
      },
    );

    const tokenEndpoint = resp.data.tokenServiceURL;
    const clientSecret = resp.data.clientSecret;
    const clientid = resp.data.clientId;

    const bearerPapmApi = await this.getBearer(
      tokenEndpoint,
      clientid,
      clientSecret,
    );

    const resp2 = await axios.get(
      `${resp.data.URL}/sap/opu/odata/NXI/P1_N_MOD_SRV/ENVVSet`,
      {
        headers: {
          Authorization: `Bearer ${bearerPapmApi.access_token}`,
        },
      },
    );

    return resp2.data;
  }

  async sampleGetDataBaseConnectionViaAPI(): Promise<unknown> {
    const { papmService, bearerPapmApi } = await this.getPaPMApiToken();

    const resp = await axios.get(
      `https://${papmService.service.url}/sap/opu/odata/NXI/P1_N_APP_ADMIN_SRV/DbCredentialsSet`,
      {
        headers: {
          Authorization: `Bearer ${bearerPapmApi.access_token}`,
        },
      },
    );

    return resp.data;
  }

  private async getPaPMApiToken() {
    const PAPM_SERVICE_NAME =
      process.env.PAPM_SERVICE_NAME || 'papm-service-default';
    //get data from the environment VCAP_SERVICES, could also be from user provided service
    // This is an OAuthCall client credentials
    // Smart Sheets can also be call with OAuth Client Credentials
    const papmService = getServices({ service: PAPM_SERVICE_NAME });
    const tokenEndpoint = ` ${papmService.service.uaa.url}/oauth/token `;
    const clientSecret = papmService.service.uaa.clientsecret;
    const clientid = papmService.service.uaa.clientid;

    const bearerPapmApi = await this.getBearer(
      tokenEndpoint,
      clientid,
      clientSecret,
    );
    return { papmService, bearerPapmApi };
  }

  private async getDestinationToken() {
    const DESTINATION_SERVICE_NAME =
      process.env.DESTINATION_SERVICE_NAME || 'destination-lite';
    const destinationService = getServices({
      service: DESTINATION_SERVICE_NAME,
    });
    const tokenEndpoint = ` ${destinationService.service.url}/oauth/token `;
    const clientSecret = destinationService.service.clientsecret;
    const clientid = destinationService.service.clientid;

    const bearerDestinationApi = await this.getBearer(
      tokenEndpoint,
      clientid,
      clientSecret,
    );
    return { destinationService, bearerDestinationApi };
  }

  async getBearer(
    tokenEndpoint: string,
    clientId: string,
    clientSecret: string,
  ): Promise<any> {
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
