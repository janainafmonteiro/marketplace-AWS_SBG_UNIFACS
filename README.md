# ☁️ Serverless Cloud Marketplace 

## 🎯 Objetivo do Projeto

O objetivo deste projeto é construir do zero uma plataforma de e-commerce (marketplace) 100% *serverless* e orientada a eventos. Vamos focar em criar uma arquitetura segura, escalável e dentro do AWS Free Tier (nível gratuito), utilizando as melhores práticas do mercado. 

Este repositório será construído passo a passo (commit por commit). Assim, vocês poderão acompanhar a evolução do código, desde a configuração inicial até a infraestrutura completa rodando na nuvem.

## 🛠️ Tecnologias que Iremos Usar

*   **Infraestrutura como Código (IaC):** AWS CDK (com TypeScript)
*   **Autenticação:** Amazon Cognito
*   **Computação e APIs:** AWS Lambda e Amazon API Gateway
*   **Banco de Dados:** Amazon DynamoDB (Single-Table Design)
*   **Mensageria (Assincronismo):** Amazon SQS e Amazon SNS
*   **Armazenamento e Distribuição:** Amazon S3 e Amazon CloudFront
*   **Segurança e Gestão:** IAM e AWS Budgets

---

## 🚀 Primeiros Passos: Preparando o Ambiente

Antes de escrevermos qualquer linha de código, precisamos garantir que nossa conta AWS está segura, monitorada contra gastos e que nossas ferramentas locais estão instaladas.

### 1. Criar Alertas de Custo (AWS Budgets)
A primeira regra da nuvem é proteger seu bolso.
1. Acesse o [Console da AWS](https://console.aws.amazon.com/) com sua conta *Root*.
2. Busque por **AWS Budgets**.
3. Crie dois alertas de orçamento (Zero Spend / Cost Budget):
   * Um alerta configurado para **$1**.
   * Outro alerta configurado para **$5**.
4. Configure para enviar um e-mail para você caso os gastos ultrapassem esses valores.

### 2. Criar Usuário IAM de Desenvolvimento
Nunca utilize a conta *Root* (o e-mail principal) no dia a dia. Vamos criar um usuário específico para programar.
1. No console, busque por **IAM**.
2. Vá em **Users** > **Create user**.
3. Dê um nome (ex: `dev-admin`) e avance.
4. Selecione **Attach policies directly** e marque a política `AdministratorAccess`.
5. Crie o usuário.
6. Após criar, clique no usuário, vá na aba **Security credentials** e crie uma **Access key** (selecione *Command Line Interface (CLI)*). 
7. **Importante:** Guarde a *Access Key* e a *Secret Access Key* em um local seguro. Você precisará delas no Passo 4.

### 3. Instalar Ferramentas Locais
Você precisará ter os seguintes softwares instalados na sua máquina:
*   **Node.js**: Baixe e instale a versão LTS do [site oficial do Node.js](https://nodejs.org/).
*   **AWS CLI**: Baixe e instale a interface de linha de comando da [documentação oficial da AWS](https://aws.amazon.com/pt/cli/).

### 4. Configurar a AWS CLI
Abra o seu terminal (Prompt de Comando, PowerShell ou Terminal do Linux/Mac) e conecte sua máquina à sua conta AWS utilizando as credenciais do Passo 2:

```bash
aws configure
```
Preencha os dados solicitados:
*   **AWS Access Key ID:** (Sua chave de acesso)
*   **AWS Secret Access Key:** (Sua chave secreta)
*   **Default region name:** `us-east-1` (ou a região de sua preferência)
*   **Default output format:** `json`

### 5. Instalar o AWS CDK e Inicializar o Projeto
O AWS CDK é a ferramenta que usaremos para criar nossa infraestrutura usando TypeScript.

No terminal, instale o CDK globalmente:
```bash
npm install -g aws-cdk
```

Crie a pasta do nosso projeto e entre nela:
```bash
mkdir serverless-marketplace
cd serverless-marketplace
```

Inicialize o projeto CDK utilizando TypeScript:
```bash
cdk init app --language typescript
```

### 6. Executar o CDK Bootstrap
O *Bootstrap* prepara a sua conta AWS para trabalhar com o CDK, criando um bucket S3 interno e as permissões necessárias para que a AWS consiga receber e implantar nosso código.

No terminal, rode:
```bash
cdk bootstrap
```

---

Pronto! Nossa base está preparada e configurada corretamente. A partir do próximo commit, começaremos a criar nossos recursos na nuvem diretamente pelo código.
