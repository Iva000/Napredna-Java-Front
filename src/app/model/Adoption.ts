import { Person } from "./Person";
import { Pet } from "./Pet";

export class Adoption{

    public adoptionId!: Number;
    public date!: Date;
    // public firstTime!: Boolean;
    public vetReport!: String;
    public petId!: Pet;
    public personId!: Person;
}