import { auth } from "../services/firebase";

function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
}
export {signup};