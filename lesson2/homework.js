class Fighter {
    constructor(name, power, health) {
        this.name = name;
        this.power = power;
        this.health = health;
    }

    setDamage(damage) {
        this.health = this.health - damage;
        console.log(`${this.name}'s health: ${this.health}`);
    }
    hit(enemy, point = 1) {let damage = point * this.power;
        enemy.setDamage(damage)
    }



    isAlive() {
        return this.health > 0;
    }
}

class ImprovedFighter extends Fighter {
    hit(enemy, point = 1) {
        super.hit(enemy, point * 2);
    }
}
let fight = (fighter, improvedFighter, ...points) => {
    for (let point of points) {
    fighter.hit(improvedFighter, point);
    if (!improvedFighter.isAlive()) {
        break;
    }
    improvedFighter.hit(fighter, point);
    if (!fighter.isAlive() ){
        break;
    }
    }

    if (fighter.isAlive()) {
        console.log(`${fighter.name} won!!!`);
    } else if (improvedFighter.isAlive()) {
        console.log(`${improvedFighter.name} won!!!`);
    } else { console.log("No winner :(");}
};

let andrew = new Fighter('Andrew', 2, 200);
let mike = new ImprovedFighter('Mike', 2, 200);
fight(andrew, mike, 25, 13, 45);

