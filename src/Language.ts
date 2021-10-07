const PROPERTIES = ["Low Level", "High Level", "Object Oriented", "Strongly Typed", "Loosely Typed", "Imperative"];
const LOW_LEVEL = 0b1;
const HIGH_LEVEL = 0b10;
const OBJECT_ORIENTED = 0b100;
const STRONGLY_TYPED = 0b1000;
const LOOSELY_TYPED = 0b10000;
const IMPERATIVE = 0b100000;

const DIFFICULTY = ["Basic", "Moderate", "Complex", "Extremely Complex"];
const BASIC = 0;
const MODERATE = 1;
const COMPLEX = 2;
const EXTREMELY_COMPLEX = 3;

class Language
{
    name: string;
    difficulty: number;
    properties: number;
    compiler: string;

    constructor(name: string, difficulty: number, properties: number, compiler: string)
    {
        this.name = name;
        this.difficulty = difficulty;
        this.properties = properties;
        this.compiler = compiler;
    }

    /**
     * @param {Property} property 
     */
    hasProperty(property: number)
    {
        return (property & this.properties) != 0;
    }

    getPropertyNames(): string[]
    {
        let names: string[] = [];
        for (let i = 0; i < PROPERTIES.length; i++)
        {
            if ((this.properties & 1 << i) != 0)
                names.push(PROPERTIES[i]);
        }
        return names;
    }
}

export const JAVA = new Language("Java", MODERATE, HIGH_LEVEL | OBJECT_ORIENTED | STRONGLY_TYPED, "**INCOMPLETE**");
export const C = new Language("C", COMPLEX, LOW_LEVEL | IMPERATIVE, "gcc -o %timestamp%.exe *.c");
export const CPP = new Language("C++", COMPLEX, HIGH_LEVEL | OBJECT_ORIENTED | STRONGLY_TYPED, "g++ -o %timestamp%.exe *.cpp");
export const ASSEMBLY = new Language("Assembly", EXTREMELY_COMPLEX, LOW_LEVEL, "nasm -fwin64 *.asm && gcc -o %timestamp%.exe *.obj");
export const JAVASCRIPT = new Language("JavaScript", BASIC, HIGH_LEVEL | LOOSELY_TYPED | OBJECT_ORIENTED, "**INCOMPLETE**");