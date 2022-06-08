class Memory {
    constructor() {
        this.data = [];

        // Reset memory
        for (let i = 0; i < 0xFFFF; i++) {
            this.data[i] = 0x00;
        }
    }

    clear() {
        for (let i = 0; i < 0x4020; i++) {
            this.data[i] = 0x00;
        }
    }

    get(address) {
        return this.data[address] || 0x00;
    }

    set(address, value) {
        this.data[address] = value;
    }

    /**
     * 64KB array instruction set.
     * Only loads ROM element ($4020 - $FFFF)
     *
     * @param program
     */
    loadProgram(program) {
        for (let i = 0x4020; i < 0xFFFF; i++) {
            this.data[i] = program[i];
        }
    }
}
