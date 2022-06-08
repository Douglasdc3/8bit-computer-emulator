class Compiler {

    compile(program) {
        this.data = [];
        for (let i = 0; i < 0xFFFF; i++) {
            this.data[i] = 0xEA;
        }

        program = program.split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .filter((line) => line[0] !== ';')
            .map((line) => {
                return line.split(';')[0].trim().replace(/\s\s+/g, ' ');
            })

        this.counter = 0x0000;
        for (let line of program) {
            console.log(line);
            if (line.startsWith('.org ')) {
                this.counter = parseInt(line.replace('.org', '').trim().substr(1), 16);

                console.log('Moving to $' + this.counter.toString(16));
            } else if (line.startsWith('.word')) {
                let upperByte = parseInt(line.replace('.word', '').trim().substr(1, 2), 16);
                let lowerByte = parseInt(line.replace('.word', '').trim().substr(2), 16);

                console.log(`Writing word $${lowerByte.toString(16)} and $${upperByte.toString(16)}`);
                this.write(lowerByte);
                this.write(upperByte);
            } else if (line.startsWith('NOP')) {
                this.write(0xEA);
            } else if (line.startsWith('LDA')) {
                // TODO Sub modes force IMM right now
                let instruction = line.replace('LDA', '').trim();

                if (instruction > 255 || instruction < 0) {
                    throw new Error('Invalid LDA (IMM) value to large on line ' + line)
                }

                this.write(0xA9);
                this.write(instruction)
            } else if (line.startsWith('ADC')) {
                // TODO Sub modes force IMM right now
                let instruction = line.replace('ADC', '').trim();

                if (instruction > 255 || instruction < 0) {
                    throw new Error('Invalid ADC (IMM) value to large on line ' + line)
                }

                this.write(0x69);
                this.write(instruction)
            } else if (line.startsWith('STA')) {
                let instruction = line.replace('STA', '').trim();
                this.write(0x8D);

                if (instruction.startsWith('$')) {
                    let addressHi = parseInt(instruction.substring(1, 3), 16);
                    let addressLo = parseInt(instruction.substring(3, 5), 16);
                    this.write(addressHi);
                    this.write(addressLo);
                }

            }
        }
        this.print();
    }

    write(byte) {
        this.data[this.counter] = byte;
        this.counter++;
    }

    getRom() {
        return this.data;
    }

    print() {
        for (let i = 0x4020; i < 0x402F; i++) {
            console.log(i.toString(16) + ' => ' + this.data[i].toString(16));
        }

        for (let i = 0xFFFC; i < 0xFFFF; i++) {
            console.log(i.toString(16) + ' => ' + this.data[i].toString(16));
        }
    }
}
