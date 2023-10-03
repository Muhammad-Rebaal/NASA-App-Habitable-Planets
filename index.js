import {parse} from "csv-parse"
import fs from "fs"

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6 && planet['koi_teq'] > 13 && planet['koi_teq'] < 15.564 ;
}

fs.createReadStream('kepler_data.csv')
  .pipe(parse({
    comment: '#',
    columns: true,
  }))
  .on('data', (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    console.log(`${habitablePlanets.length} habitable planets found!\n`);
    habitablePlanets.forEach((planet, index) => {
      console.log(`${index}: ${JSON.stringify(planet)}\n`);
    });
  });