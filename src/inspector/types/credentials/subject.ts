import { z } from 'zod';

export type Subject = {
  id?: URL;
  claims: Claim[];
};
