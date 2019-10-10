import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  resultAllPokemon: any[] = [];
  newAllPokemonList: any[] = [];

  obj: any = {};

  constructor(
    private http: HttpClient
  ) {
  }

  getPokemons() {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=964`;
    return this.http.get(url);
  }

  getOnePokemon(name: string) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return this.http.get(url);
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const URL = `https://pokeapi.co/api/v2/pokemon/?limit=964`;
      this.http.get(URL).subscribe((res: any) => {
        this.resultAllPokemon = res.results;

        // https://pokeapi.co/api/v2/pokemon/10023/
        // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
        // ["https:", "", "pokeapi.co", "api", "v2", "pokemon", "2", ""]

        for (let i = 0; this.resultAllPokemon.length > i; i++) {
          const URL_FOTO = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
          const separado = this.resultAllPokemon[i].url.split('/');
          const id = separado[6];

          // tslint:disable-next-line:no-shadowed-variable
          this.getPokemonInformation(id).then((res: any) => {
            this.obj = res;
          }).then(() => {
            const objPokemon = {
              id,
              name: this.resultAllPokemon[i].name,
              info: this.obj,
              urlFoto: `${URL_FOTO}/${id}.png`
            };
            this.newAllPokemonList.push(objPokemon);
            resolve(this.newAllPokemonList);
          });
        }
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
    });
  }

  getPokemonInformation(id: number) {
    return new Promise((resolve, reject) => {
      const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
      this.http.get(URL).subscribe((res: any) => {
        resolve(res);
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
    });
  }


}
