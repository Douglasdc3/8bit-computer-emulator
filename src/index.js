const computer = new Computer();
const compiler = new Compiler();

// Compile test program
compiler.compile(`
; Comments are ignored
.org $4020
NOP
LDA    5      ; load 5
ADC    10     ; Add 10 
NOP           ; Accumulator has 15
LDA 1
STA $2008
LDA 2
STA $2009
LDA 3
STA $200A
LDA 4
STA $200B

    
; 6502 Reads address FFFC and FFFD as starting address
.org $FFFC
.word $4020

`);

computer.load(compiler.getRom())

for (let i = 0; i < 100; i++) {
    computer.cpu.tick();
}

// Debug
console.log(computer.cpu);
