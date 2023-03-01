export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  getAllHouses() {
    return this.getResource(`/houses/`);
  }
  getHouse(id) {
    return this.getResource(`/houses/${id}/`);
  }

  async getAllCharacters() {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacterData);
  }
  async getCharacter(id) {
    const character = await this.getResource(`/characters/${id}/`);
    return this._transformCharacterData(character);
  }

  getAllBooks() {
    return this.getResource(`/books/`);
  }
  getBook(id) {
    return this.getResource(`/books/${id}/`);
  }

  _transformCharacterData(char) {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture,
    };
  }

  _transformHouseData(house) {
    return {
      name: house.name,
      region: house.region,
      worlds: house.worlds,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    };
  }

  _transformBookData(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publier: book.publier,
      released: book.released,
    };
  }
}
