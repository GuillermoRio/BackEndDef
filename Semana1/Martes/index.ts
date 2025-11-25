//Funcion que reciba (name, status, gender) => {
//Los episodios pasaran a ser un array de objetos
import axios from "axios";

type character = {
    name: string,
    status: string,
    gender: string
}


const URL = "https://rickandmortyapi.com/api/character/?";
const query: string[] = ["name", "status", "gender"];

const reduccion = (name?: string, status?: string, gender?: string) => {
    const valores = [name, status, gender];
    const URLcompleta = query.reduce((acc, str, i) => {
        const valorInd = valores[i];
        if(valorInd){
            return acc + `${str}=${valorInd}`
        }
        return acc;
    }, "");
    return URL + URLcompleta;
}

const param = axios.get(reduccion("Rick")).then((response) => {
        const personajes:character[] = response.data.results
        console.log(personajes.at(0)?.gender)
    });