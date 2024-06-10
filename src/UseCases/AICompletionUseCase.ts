import axios from 'axios';

export class AICompletionUseCase {
    private readonly messages: string[];

    constructor(messages: string[]) {
        this.messages = messages;
    }

    async execute() {
        const host = "http://localhost:8967";
        const { data } = await axios.post(`${host}/api/completions`, {
            messages: this.messages,
        })
    }
}