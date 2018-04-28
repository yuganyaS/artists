var ArtistApi = 'http://www.theaudiodb.com/api/v1/json/';

//Return Artist details from artist name
exports.search = ArtistApi+'1/search.php?s=';
//Return all Album details from artist name
exports.searchallalbum = ArtistApi+'1/searchalbum.php?s=';
//Return all track details from album id
exports.searchtract_byalbumid = ArtistApi+'1/track.php?m=';
