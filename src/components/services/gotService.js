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
    const res = await this.getResource(`/houses/`);
    return res.map(this._transformHouseData);
  };
  getHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}/`);
    return this._transformHouseData(house);
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
    const res = await this.getResource(`/books/`);
    return res.map(this._transformBookData);
  };
  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}/`);
    return this._transformBookData(book);
  };

  isSet(data) {
    if (data) {
      return data;
    } else {
      return "No information.";
    }
  }

  _exctractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  };

  _transformCharacterData = (char) => {
    return {
      id: this._exctractId(char),
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture),
    };
  };

  _transformHouseData = (house) => {
    return {
      id: this._exctractId(house),
      name: this.isSet(house.name),
      region: this.isSet(house.region),
      worlds: this.isSet(house.worlds),
      titles: this.isSet(house.titles),
      overlord: this.isSet(house.overlord),
      ancestralWeapons: this.isSet(house.ancestralWeapons),
    };
  };

  _transformBookData = (book) => {
    return {
      id: this._exctractId(book),
      name: this.isSet(book.name),
      numberOfPages: this.isSet(book.numberOfPages),
      publier: this.isSet(book.publier),
      released: this.isSet(book.released),
    };
  };
}
