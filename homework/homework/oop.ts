import { v4 as uuidv4 } from 'uuid';

abstract class InventoryItem {
    private id: string;
    private name: string;
    private price:number;
    private description: string

    constructor(id:string, name:string, price:number, description:string){
        this.id = id
        this.name = name
        this.price = price
        this.description = description
    }
}

class Shop{
    private item: InventoryItem[]

    constructor(item: InventoryItem[]){
        this.item = item
    }
}




class Weapon extends InventoryItem{
    private damage:number

    constructor(id: string, name: string, price: number, description:string, damage:number){
        super(id, name, price, description);
        this.damage = damage
    }

    getDamage(): number {
        return this.damage
    }

    setDamage(damage:number): void {
        this.damage = damage
    }
}



class Armor extends InventoryItem {
    private defense: number

    constructor(id: string, name: string, price: number, description:string, defense:number){
        super(id, name, price, description);
        this.defense = defense
    }

    getDefense(): number {
        return this.defense
    }

    setDefense(defense:number): void {
        this.defense = defense
    }



}




class Character {
    id: string;
    name: string;
    archtype: string;
    fightingStyle: 'ranged' | 'melee';
    inventory: InventoryItem[];

    constructor(id: string, name: string, archtype:string, fightingStyle :'ranged'|'melee'){
        this.id = id
        this.name = name
        this.archtype = archtype
        this.fightingStyle = fightingStyle
        this.inventory = []
    }
};





class Inventory {
    items: InventoryItem[]

    constructor() {
        this.items = []
    }
}



function addToInventory(item: InventoryItem, character: Character){
    character.inventory.push(item)
}


function printInventory(character: Character){
    console.log(character.inventory)
}


function removeAllInstanceOfItem(item: InventoryItem, character: Character){
    character.inventory = character.inventory.filter(i => i != item)
}


function removeSpecifiedQuantity (quantity: number,item: InventoryItem, character:Character  ){
    let count = 0
    character.inventory = character.inventory.filter(i => {
        if (i === item && count < quantity){
            count++
            return false
        }
        return true
    })

}

const sword = new Weapon('1', 'Rambos sword', 100, 'sweet sword', 11)
console.log(sword.getDamage())
sword.setDamage(15)
console.log(sword.getDamage())