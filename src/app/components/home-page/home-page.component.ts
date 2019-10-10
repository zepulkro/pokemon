import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  allPokemons: any[] = [];
  pokemon: any = {};
  loading: boolean;

  constructor(
    private data: DataService
  ) {
    this.loadPoke();
  }

  ngOnInit() {

  }

  onPokemonLoad(objPoke: any) {
    this.pokemon = objPoke;
    console.log(this.pokemon);
  }

  orderAz() {
    this.allPokemons.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  private loadPoke() {
    this.loading = true;

    this.data.getAll().then((res: any) => {
      this.loading = true;
      this.allPokemons = res;
      if (this.allPokemons.length > 0) {
        this.loading = false;
      }
    });
  }

}
