import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import profs from '../../../../data/profs.json'

@Injectable()
export class DataService {

  constructor(private http: HttpClient ) { }

  profs(): Prof[] {
    return profs as Prof[]
  }

  profParCourriel(courriel: string): Prof {
    // @ts-ignore
    return this.profs().find(p => p.courriel === courriel);
  }

  videos(): Prof[] {
    return this.profs().filter(prof => prof.lienVideo);
  }

  photos(): Prof[] {
    return this.profs().filter(prof => prof.image);
  }

  cours(): Observable<Cours[]> {
    return this.http.get<Cours[]>('https://raw.githubusercontent.com/departement-info-cem/departement-info-cem.github.io/master/data/cours.json');
  }

  questions(s: string): Observable<Question[]> {
    return this.qs().pipe(
      map(
        qs => qs.filter(q => {
          console.log('coucou');
          if (q.q.indexOf(s) > -1) return true;
          if (q.r.indexOf(s) > -1) return true;
          if (q.cats) {
            //console.log(q.cats);
            for (let cat of q.cats) {
              console.log(q.q + ' ' + q.cats + ' ' + cat + ' ' + (cat.indexOf(s) > -1));
              if (cat.indexOf(s) > -1) return true;
            }
          }
          return false;
        })
      )
    );
  }

  qs(): Observable<Question[]> {
    return this.http.get<Question[]>('https://raw.githubusercontent.com/departement-info-cem/departement-info-cem.github.io/master/data/faq.json');
  }

  botRules(): Observable<BotRule[]> {
    return this.http.get<BotRule[]>('https://raw.githubusercontent.com/departement-info-cem/departement-info-cem.github.io/master/data/bot.json');
  }
}

export class BotRule {
  id = -1;
  q: string | undefined;
  reponses: string[] = [];
  triggers: BotTrigger[] = [];
}

export class BotTrigger {
  id = -1;
  r: string | undefined;
}


export class Prof {
  nom = '';
  image = '';
  courriel: any;
  lienVideo = '';
  bureau = '';
}

export class Question {
  q = '';
  r = '';
  cats: string[] = [];
  liens: string[] = [];
}


export class Cours {
  no = '';
  nom = '';
  v = 'c';
  url = '';
  icons: string[] = [];
  s = 0;
}

