import { ResponseCreateSecretDTO } from './dto/response-create-secret.dto';
import { BadRequestResponseDto } from './dto/bad-request-response.dto';
import { ResponseGetSecretByLinkDTO } from './dto/response-get-secret.dto';
import { ResponseDeleteSecretByLinkDTO } from './dto/response-delete-secret.dto';
import { ResponseGenerateSecretDTO } from './dto/response-get-generate-secret.dto';

const createSecretPhrase = {
  operation: 'creating secret phrase and save to db',
  responses: [
    {
      status: 201,
      type: ResponseCreateSecretDTO,
    },
    {
      status: 400,
      type: BadRequestResponseDto,
    },
  ],
};

const getSecretPhraseByLink = {
  operation: 'get secret phrase by link (id)',
  responses: [
    { status: 200, type: ResponseGetSecretByLinkDTO },
    { status: 400, type: BadRequestResponseDto },
  ],
};

const deleteSecretPhrase = {
  operation: 'delete secret phrase from db',
  responses: [
    { status: 200, type: ResponseDeleteSecretByLinkDTO },
    { status: 400, type: BadRequestResponseDto },
  ],
};

const generateSecretPhrase = {
  operation: 'generate secret phrase of arbitrary length',
  responses: [{ status: 200, type: ResponseGenerateSecretDTO }],
};

export default {
  createSecretPhrase,
  getSecretPhraseByLink,
  deleteSecretPhrase,
  generateSecretPhrase,
};
