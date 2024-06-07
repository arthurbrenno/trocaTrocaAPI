import crypto from 'crypto';
import * as bip39 from 'bip39';

export class ChaveUnicaService {
    static criar(senha: string): string 
    {
        const ENTROPY = crypto.createHash("sha256").update(senha).digest("hex");
        const ENTROPY_BUFFER = Buffer.from(ENTROPY, "hex");
        const MNEMONIC = bip39.entropyToMnemonic(ENTROPY_BUFFER);

        return MNEMONIC;
    }
}
