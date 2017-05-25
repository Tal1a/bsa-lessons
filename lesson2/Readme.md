#BSA 17 JS. Lecture 2 - JS
###Створити класс “Fighter”. Клас повиненин приймати значення name, power і health. Також клас повинен мати методи “setDamage” та “hit”.

Метод “setDamage” приймає значення “damage” і наносить урон змінюючи значення health (health = health - damage), і виводить в консоль строку “ health: ”.

Метод “hit” приймає значення “enemy”, “point”, і в середині викликає метод переданого обекту “enemy.setDamage(damage)”. “damage” вираховується наступним чином - damage = point * power, де point - змінний параметр, прийнятий в функцію "fight", power - це властивість об'єкту який наносить урон.

###Створити клас ImprovedFighter, який буде наслідуватися від класу Fighter, з його властивостями і методами.

Для цього класу створити метод doubleHit, який буде викликати наслідуваний метод “hit”, і передавати туди подвоєне значення “point”.

Від обох класів породити по екземпляру відповідно fighter, improvedFighter.

###Створити функцію fight, яка прийматиме параметри - fighter, improvedFighter, і point.

fight може приймати довільну кількість параметрів. Наприклад, fight(fighter, improvedFighter, 25, 13, 45), де point = [25, 13, 45].

Ця функція запускатиме процес гри: гравці по черзі наносять удар один одному за допомогою методу hit, що приймає відповідне значення point. Якщо один із них помирає (health = 0), то гра закінчується і результат виводиться в консоль.

При виконанні домашнього завдання необхідно використати: - block scoping (let) - spread / rest operator - default settings - string interpolation - arrow functions - classes + inheritance + super
