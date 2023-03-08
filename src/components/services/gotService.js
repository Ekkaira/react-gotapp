export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getAllHouses = async () => {
    return this.getResource(`/houses/`);
  };
  getHouse = async (id) => {
    return this.getResource(`/houses/${id}/`);
  };

  getAllCharacters = async () => {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacterData);
  };
  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}/`);
    return this._transformCharacterData(character);
  };

  getAllBooks = async () => {
    return this.getResource(`/books/`);
  };
  getBook = async (id) => {
    return this.getResource(`/books/${id}/`);
  };

  _exctractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  };

  _transformCharacterData = (char) => {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture,
    };
  };

  _transformHouseData = (house) => {
    return {
      name: house.name,
      region: house.region,
      worlds: house.worlds,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    };
  };

  _transformBookData = (book) => {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publier: book.publier,
      released: book.released,
    };
  };
}
