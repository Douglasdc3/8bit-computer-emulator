class Cpu {
    constructor(computer) {
        this.opcodes = {
            0xA9: () => {
                this.acc = parseInt(this.read());
            },
            0x69: () => {
                this.acc += parseInt(this.read());
            },
            0x8D: () => {


                let hi = this.read() << 8;
                let lo = this.read();

                console.log('test', hi, lo);
                this.computer.memory.set(hi | lo, this.acc);
            },
            0xEA: function () {},
        };

        this.computer = computer;
        this.reset();
    }

    reset() {
        this.acc = 0;            // Accumulator
        this.x = 0;              // X register
        this.y = 0;              // Y register
        this.stack = 0x00000001; // Stack Pointer
        this.pc = 0xFFFC;        // Program Counter

        // CPU Flags
        this.n = false;          // Negative Flag
        this.v = false;          // Overflow Flag
        this.b = false;          // Break Flag
        this.d = false;          // Decimal Flag
        this.i = false;          // Interrupt Flag
        this.z = false;          // Zero page Flag
        this.c = false;          // Carry Flag

        // Load reset vector
        let resetLower = this.computer.memory.get(this.pc);
        this.pc++;
        let resetUpper = this.computer.memory.get(this.pc);
        console.log(this.computer.memory);

        this.pc = (resetUpper << 8) | resetLower;
    }

    tick() {
        // Read instruction
        let instruction = this.read();

        let opcode = this.opcodes[instruction] || undefined;

        if (opcode === undefined) {
            throw new Error('Unknown opcode ' + instruction.toString(16));
        }

        opcode();
    }

    read() {
        let byte = this.computer.memory.get(this.pc);

        this.pc++;

        return byte;
    }
}
