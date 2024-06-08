import crypto from 'crypto';
import * as bip39 from 'bip39';

export class ChaveUnicaService {
    public static criar(apelido: string): string 
    {
        const SENHA_FORTIFICADA = apelido + "AnticOnstiTucionalIssimamEnte";
        const ENTROPY = crypto.createHash("sha256").update(SENHA_FORTIFICADA).digest("hex");
        const ENTROPY_BUFFER = Buffer.from(ENTROPY, "hex");
        const MNEMONIC = bip39.entropyToMnemonic(ENTROPY_BUFFER);

        return MNEMONIC;
    }
}
