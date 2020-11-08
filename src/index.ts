class Human {
  public name : string;
  public age : number;
  public gender : string;
  constructor(name : string, age : number, gender : string){
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}
const shawn = new Human('shawn', 24, 'male');

const sayHi = (person : Human): string => {
  const { name, age, gender } = person;
  return `Hello ${name}, You are ${age}, and you are ${gender}`;
};

console.log(sayHi(shawn));
export {};