import * as cdk from 'aws-cdk-lib/core';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class Autenticacao extends Construct {
  public readonly userPool: cognito.UserPool;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'marketplace-usuarios',
      selfSignUpEnabled: true,            // qualquer pessoa pode se cadastrar
      signInAliases: { email: true },     // o login é feito com e-mail
      autoVerify: { email: true },        // o Cognito envia um código para confirmar o e-mail
      removalPolicy: cdk.RemovalPolicy.DESTROY, // cdk destroy apaga tudo (só para fins didáticos)
    });
  }
}