import { UserInterface } from "../../models/User";

declare global {
    namespace Express {
        interface User extends UserInterface{
            id: string
        }
    }
}