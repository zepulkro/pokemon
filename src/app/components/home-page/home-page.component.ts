import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  pokemons: Object;
  constructor(
    private data: DataService
    ) { }

  ngOnInit() {
    this.data.getPokemons().subscribe(
      response => this.pokemons = response.results
    )
  }

  onPokemonLoad() {
    console.log("1");
  }  

}
