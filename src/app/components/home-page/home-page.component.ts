import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  pokemons: any[] = [];
  dataPokemon: any[] = [];

  pokemon: any = {};

  constructor(
    private data: DataService
    ) { 
      this.loadPoke();
    }

  ngOnInit() {
    
  }

  onPokemonLoad(objPoke: any) {
    this.pokemon = objPoke;
  }  

  private loadPoke() {
    this.data.getPokemons().subscribe(
      (response: any) => {
        this.pokemons = response.results
        for(let i = 0; this.pokemons.length > i; i++) {
          this.data.getOnePokemon(this.pokemons[i].name).subscribe(
            (response: any) => {
              this.dataPokemon.push(response);
            }
          )     
        }
      }
    )
  }

}
