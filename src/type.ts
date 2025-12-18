interface Shape {
    x: number;
    y: number;
    color: string;
}

export interface Circle extends Shape {
    type: "circle";
    radius: number;
}

export interface Rectangle extends Shape {
    type: "rectangle";
    width: number;
    height: number;
}

export interface Drawings {
    x:number;
    y:number;
    color:string;
}

export type Shapes = Circle | Rectangle;