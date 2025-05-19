// Шаг 1. Класс Item
class Item {
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  getInfo() {
    return `Название: ${this.name}, Вес: ${this.weight} кг, Редкость: ${this.rarity}`;
  }

  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

// Шаг 2. Класс Weapon, расширяющий Item
class Weapon extends Item {
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  use() {
    if (this.durability > 0) {
      this.durability = Math.max(0, this.durability - 10);
    } else {
      console.log(`${this.name} сломано и не может быть использовано.`);
    }
  }

  repair() {
    this.durability = 100;
  }

  getInfo() {
    // Переопределяем getInfo, чтобы включить damage и durability
    return `${super.getInfo()}, Урон: ${this.damage}, Прочность: ${this.durability}%`;
  }
}

// Шаг 3. Тестирование

// Примеры предметов
const potion = new Item("Healing Potion", 0.5, "common");
console.log(potion.getInfo());
potion.setWeight(0.6);
console.log(potion.getInfo());

console.log("----------");

// Примеры оружия
const sword = new Weapon("Steel Sword", 3.5, "rare", 25, 80);
console.log(sword.getInfo());
sword.use();
console.log(`Прочность после использования: ${sword.durability}`);
sword.repair();
console.log(`Прочность после починки: ${sword.durability}`);

const axe = new Weapon("Battle Axe", 5.0, "legendary", 40, 10);
console.log(axe.getInfo());
axe.use();
axe.use(); // второй раз прочность станет 0
axe.use(); // уже сломано
console.log(`Текущая прочность: ${axe.durability}`);