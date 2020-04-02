export class Ingredient {
    public Name: string;
    public Amount: number;
    // constructor(public name : string, public amount:number){}
    constructor(name: string, amount:number) {
        this.Name = name;
        this.Amount = amount;  
    }
}
