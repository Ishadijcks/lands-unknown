import { Character } from "backend/character/Character";

export class CharacterManager {
  onlineCharacters: Character[] = [];

  constructor() {}

  addCharacter(character: Character) {
    const onlineCharacter = this.getCharacter(character.userId);
    if (onlineCharacter) {
      this.removeCharacter(onlineCharacter, "You have been disconnected because you logged in from another location");
    }

    this.onlineCharacters.push(character);
  }

  getCharacter(userId: string): Character | undefined {
    return this.onlineCharacters.find((character) => {
      return character.userId === userId;
    });
  }

  getCharacterCount(): number {
    return this.onlineCharacters.length;
  }

  removeCharacter(character: Character, reason: string) {
    const index = this.onlineCharacters.indexOf(character);
    if (index > -1) {
      const character = this.onlineCharacters.splice(index, 1)[0];
      character.sendConnectionClosed(reason);
      character.socket.close();
    }
  }
}
