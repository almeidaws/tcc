const musicsDatabase = require('../musics/database.js');
const genresDatabase = require('../genres/database.js');
const favouritesDatabase = require('../favorites/database.js');

const genres = ['Classical', 'Pop', 'Romantic', 'Hip Hop', 'Dancing', 'Rock', 'Jazz', 'Blues'];
const K = genres.length;

const latentFactorsByMusic = async () => {
    const musicsQueries = await musicsDatabase.connect();
    const allMusics = await musicsQueries.getAllMusics();
    const genresQueries = await genresDatabase.connect();
    for (let i = 0; i < allMusics.length; i++)
        allMusics[i].genres = await genresQueries.getAllGenresFromMusic(allMusics[i].id); 

    allMusics.forEach(music => {
        const genre = music.genres[0];
        const genresCount = music.genres.length; 
        const weight = genresCount === 1 ? 2 : 1;
        const weights = genres.map(g => g === genre.name ? weight : 1);
        music.weights = weights;
    });

    return allMusics;
};

const musicalPreferenceByUser = async (userID) => {
    const favouritesQueries = await favouritesDatabase.connect();
    const favourites = await favouritesQueries.getFavoritesByUserID(userID);
    const genresQueries = await genresDatabase.connect();
    for (let i = 0; i < favourites.length; i++)
        favourites[i].genres = await genresQueries.getAllGenresFromMusic(favourites[i].id); 

    const weights = genres.map(g => 0);
    favourites.forEach(f => {
        const genre = f.genres[0].name;
        const genreIndex = genres.indexOf(genre);
        weights[genreIndex]++;
    });

    return weights;
};

const transpose = (array) => array[0].map((col, i) => array.map(row => row[i]));

const multiply = (a, b) => {
  var aNumRows = a.length, aNumCols = a[0].length,
      bNumRows = b.length, bNumCols = b[0].length,
      m = new Array(aNumRows);  // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;             // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}

const calculateWeights = (musicalPreferenceByUser, latentFactorsByMusic) => {
    const transposed = transpose(latentFactorsByMusic.map(m => m.weights));
    const ratings = transpose(multiply([musicalPreferenceByUser], transposed));
    latentFactorsByMusic.forEach((music, index) => {
        music.weight = ratings[index][0];
    });

    return latentFactorsByMusic;
};

const recommendations = async userID => {
    const latentFactors = await latentFactorsByMusic();
    const preferences = await musicalPreferenceByUser(userID);
    return calculateWeights(preferences, latentFactors);
};


module.exports = recommendations; 
