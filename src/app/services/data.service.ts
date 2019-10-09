import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( 
    private http: HttpClient
    ) { }

    getPokemons(){
      let url = `https://pokeapi.co/api/v2/pokemon/?limit=964`;
      return this.http.get(url);
    }

    getOnePokemon(name: string) {
      let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
      return this.http.get(url);
    }

    
}
