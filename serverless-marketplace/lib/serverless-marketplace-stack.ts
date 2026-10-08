import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { Autenticacao } from './constructs/autenticacao';

export class ServerlessMarketplaceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const autenticacao = new Autenticacao(this, 'Autenticacao');

    new cdk.CfnOutput(this, 'UserPoolId', { 
      value: autenticacao.userPool.userPoolId 
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', { 
      value: autenticacao.userPoolClient.userPoolClientId
    });
    
  }
}
