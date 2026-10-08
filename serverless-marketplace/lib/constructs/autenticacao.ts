import * as cdk from 'aws-cdk-lib/core';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';


export class Autenticacao extends Construct {
  
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const posConfirmacao = new NodejsFunction(this, 'PosConfirmacao', {
      entry: path.join(__dirname, '../../lambda/pos-confirmacao/index.ts'), // onde está o código
      runtime: lambda.Runtime.NODEJS_22_X,
      timeout: cdk.Duration.seconds(10),  // se passar de 10s, a AWS interrompe
      memorySize: 128,                    // o mínimo, suficiente para essa função
    });

    this.userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'marketplace-usuarios',
      selfSignUpEnabled: true,            // qualquer pessoa pode se cadastrar
      signInAliases: { email: true },     // o login é feito com e-mail
      autoVerify: { email: true },        // o Cognito envia um código para confirmar o e-mail
      removalPolicy: cdk.RemovalPolicy.DESTROY, 
      customAttributes: {
        role: new cognito.StringAttribute({ minLen: 1, maxLen: 20, mutable: false }),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,// cdk destroy apaga tudo (só para fins didáticos)
      lambdaTriggers: { postConfirmation: posConfirmacao },
    });

    this.userPoolClient = this.userPool.addClient('AppClient', {
      userPoolClientName: 'marketplace-frontend',
      generateSecret: false,        // site roda no navegador: não dá para esconder um secret lá
      authFlows: { userSrp: true }, // login seguro, a senha não viaja em texto puro
      preventUserExistenceErrors: true, 
      readAttributes: new cognito.ClientAttributes()
        .withStandardAttributes({ email: true, emailVerified: true })
        .withCustomAttributes('role'),
      writeAttributes: new cognito.ClientAttributes()
        .withStandardAttributes({ email: true })
        .withCustomAttributes('role'),// não revela se um e-mail já está cadastrado
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