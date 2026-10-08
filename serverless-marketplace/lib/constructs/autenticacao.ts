import * as cdk from 'aws-cdk-lib/core';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';


export class Autenticacao extends Construct {
  
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'marketplace-usuarios',
      selfSignUpEnabled: true,            // qualquer pessoa pode se cadastrar
      signInAliases: { email: true },     // o login é feito com e-mail
      autoVerify: { email: true },        // o Cognito envia um código para confirmar o e-mail
      removalPolicy: cdk.RemovalPolicy.DESTROY, // cdk destroy apaga tudo (só para fins didáticos)
    });

    this.userPoolClient = this.userPool.addClient('AppClient', {
      userPoolClientName: 'marketplace-frontend',
      generateSecret: false,        // site roda no navegador: não dá para esconder um secret lá
      authFlows: { userSrp: true }, // login seguro, a senha não viaja em texto puro
      preventUserExistenceErrors: true, // não revela se um e-mail já está cadastrado
    });

    new cognito.CfnUserPoolGroup(this, 'GrupoCliente', {
      userPoolId: this.userPool.userPoolId,
      groupName: 'cliente',
      description: 'Compradores do marketplace',
    });

    new cognito.CfnUserPoolGroup(this, 'GrupoVendedor', {
      userPoolId: this.userPool.userPoolId,
      groupName: 'vendedor',
      description: 'Vendedores que cadastram produtos',
    });
    
  }
}