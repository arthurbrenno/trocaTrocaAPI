import crypto from 'crypto';

export class HashService{
    public static generate(senha: string)
    {
          return crypto.createHash('md5').update(senha).digest('hex');
    }
}