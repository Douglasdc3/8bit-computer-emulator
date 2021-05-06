# 8bit-computer-emulator

Simulating the 6502 8-bit processing in javascript.
This is not a full implementation of real unit nor a NES Emulator. It's inspired by both for educational reasons taking some simplifications.

The PPU on the nes is replaced by a screen using direct pixel access, instead of working with sprites.

# Example

# Features

# Compiler

# TODO

* Expand readme
* Add opcodes
* Implement addressing modes
* Document compiler
* Add a code editor on one side of the screen, display current loaded program.
* Add button to tick the CPU
* Add run, pause and reset button
* Add debug pane 
  * Show memory area, highlight program counter location
  * Visualise stack memory
  * Show CPU flags
  * Show registers (A(Accumulator), X(register), Y(register), S(tackpointer))

# Resources

* [6502 Instruction set](https://www.masswerk.at/6502/6502_instruction_set.html)
* [Inspired by Ben Eater's 6502 build](https://eater.net/6502)
* [Inspired by javidx9 Nes Emulator](https://www.youtube.com/watch?v=F8kx56OZQhg)
