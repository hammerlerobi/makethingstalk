
declare class SoftSPI {
    constructor(...args: any[]);
}

declare module SoftSPI {

    function activateClient(...args: any[]): void;

    function assert(...args: any[]): void;

    function close(...args: any[]): void;

    function deactivateClient(...args: any[]): void;

    function open(...args: any[]): void;

    function read(...args: any[]): void;

    function transfer(...args: any[]): void;

    function transferBit(...args: any[]): void;

    function transferByte(...args: any[]): void;

    function write(...args: any[]): void;
}

declare module "rpi-softspi" {
    export = SoftSPI;
}


