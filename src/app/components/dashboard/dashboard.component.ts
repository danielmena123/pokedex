import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pokemones } from 'src/app/models/pokemones';
import { PokemonDetail } from 'src/app/models/pokemonesDetails';
import { PokemonesService } from 'src/app/services/pokemones.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {

  isAuthenticated = false;
  search: FormControl = new FormControl('');
  pokemons: Pokemones[] = [];

  private offset!: number;
  isLoading!: boolean;
  isLastPage = false;

  searchPokemon: PokemonDetail = new PokemonDetail();
  isSearching = false;

  constructor(
    private router: Router,
    private pokemonService: PokemonesService,
    private snackBar: MatSnackBar,
  ) {
    this.offset = 0 ;
    var res = sessionStorage.getItem('isAuthorized');
    if(res != null){
      this.isAuthenticated = JSON.parse(res);
    }
  }

  ngOnInit() {
    this.obtenerPokemones(this.offset);
  }

  obtenerPokemones(offset: number){
    if(!this.isLoading && !this.isLastPage){
      this.pokemonService.getPokemones(offset).subscribe((list: Pokemones[]) => {
        if(list.length === 0) {
          this.isLastPage = true;
        }

        if(!this.isLastPage) {
          this.pokemons = list;
          console.log(list);
        }
      });
    }
    
  }

  onSearchPokemon(): void {
    const value = this.search.value;
    if(value === '') {
      this.isSearching = false;
    } else {
      this.isSearching = true;
      this.isLoading = true;
      this.pokemonService.getPokemonDetail(value)
      .subscribe((pokemon: PokemonDetail) => {
        this.searchPokemon = pokemon;
        this.isLoading = false;        
      }, (error: any) => {
        this.isLoading = false;
        if(error.status === 404) {
          this.snackBar.open('Sorry, Pokemon not found', 'Ok', {
            duration: 5000,
          });
        }
      })
    }
  }
  
  Logout(){
    sessionStorage.clear();
    this.router.navigate(['/logout']);
  }
}