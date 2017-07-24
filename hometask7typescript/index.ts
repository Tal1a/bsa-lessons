interface IFighter {
    name: string;
    hit(enemy: IFighter, point: number);
    setDamage(damage: number);
    isAlive(): boolean;
}

class SimpleFighter implements IFighter {
    readonly name: string;
    private power: number;
    private health: number;

    constructor(name: string, power: number, health: number) {
        this.name = name;
        this.power = power;
        this.health = health;
    }

    setDamage(damage: number) {
        let health: number = this.health - damage;
        if (health < 0) {
            health = 0;
        }
        this.health = health;
        console.log(`${this.name}'s health: ${this.health}`);
    }

    hit(enemy: IFighter, point: number = 1) {
        let damage: number = point * this.power;
        enemy.setDamage(damage)
    }

    isAlive(): boolean {
        return this.health > 0;
    }
}

class ImprovedFighter extends SimpleFighter {
    hit(enemy: IFighter, point: number = 1) {
        super.hit(enemy, point * 2);
    }
}

let fight = (fighterOne: IFighter, fighterTwo: IFighter, ...points: number[]) => {
    for (let point of points) {
        fighterOne.hit(fighterTwo, point);
        if (!fighterTwo.isAlive()) {
            break;
        }
        fighterTwo.hit(fighterOne, point);
        if (!fighterOne.isAlive() ){
            break;
        }
    }

    if (fighterOne.isAlive()) {
        console.log(`${fighterOne.name} won!!!`);
    } else if (fighterTwo.isAlive()) {
        console.log(`${fighterTwo.name} won!!!`);
    } else { console.log("No winner :(");}
};

let andrew = new SimpleFighter('Andrew', 2, 200);
let mike = new ImprovedFighter('Mike', 2, 200);
fight(andrew, mike, 25, 13, 45);




