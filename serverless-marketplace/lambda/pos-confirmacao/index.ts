import type { PostConfirmationTriggerHandler } from 'aws-lambda';

const GRUPOS_PERMITIDOS = ['cliente', 'vendedor'];
const GRUPO_PADRAO = 'cliente';

export const handler: PostConfirmationTriggerHandler = async (event) => {
  if (event.triggerSource !== 'PostConfirmation_ConfirmSignUp') {
    return event;
  }
  const roleEscolhido = event.request.userAttributes['custom:role'];
  const grupo = GRUPOS_PERMITIDOS.includes(roleEscolhido) ? roleEscolhido : GRUPO_PADRAO;

  console.log(`Usuário ${event.userName} vai para o grupo "${grupo}"`);
  return event; // o Cognito exige que a função devolva o evento
};