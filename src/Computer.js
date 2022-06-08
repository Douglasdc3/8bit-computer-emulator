class Computer {
    // Simplified 6502 CPU
    //---------------------
    // * PPU (Picture Processing Unit) is replaced with direct pixel coordinates
    //
    // Memory mapping (64kb)
    //
    // $0000 - $07FF | $0800 | 2KB internal RAM
    // $0800 - $0FFF | $0800 | 2KB internal RAM
    // $1000 - $17FF | $0800 | 2KB internal RAM
    // $1800 - $1FFF | $0800 | 2KB internal RAM
    // $2000 - $2007 | $0008 | Screen Control
    // $2008 - $1FF8 | $1FF8 | Video RAM (Screen pixels)
    // $4000 - $401F | $001F | IO Control (Plugins)
    // $4020 - $FFFF | $BFE0 | ROM (Program)
    //
    constructor() {
        this.memory = new Memory();
        this.cpu = new Cpu(this);
        this.screen = new Screen(this);
        this.screen.start();
    }

    load(program) {
        if (Array.isArray(program)) {
            this.pause();
            this.memory.loadProgram(program);
            this.reset();
        }
    }

    pause() {

    }

    reset() {
        this.cpu.reset();
        this.memory.clear();
    }
}
