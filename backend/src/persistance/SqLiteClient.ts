import { DatabaseClient } from "backend/persistance/DatabaseClient";
import { Database } from "sqlite3";
import { CharacterSaveData } from "backend/character/CharacterSaveData";
import { Character } from "backend/character/Character";

/**
 * A local database client which fakes users
 */
export class SqLiteClient implements DatabaseClient {
  db: Database;

  // readonly USER_RECORDS: UserRecord[] = [
  //   { userName: "Isha", userId: "1" },
  //   { userName: "Another one", userId: "2" },
  // ];

  constructor() {
    this.db = new Database("saves.db");
  }

  init(): void {
    this.db.run("CREATE TABLE if not exists saves (userId TEXT, save TEXT, PRIMARY KEY(userId))");
  }

  async loadCharacterData(id: string): Promise<CharacterSaveData | null> {
    const saveData: string = await new Promise((resolve, reject) => {
      this.db.get("SELECT save FROM saves WHERE userId = $id", { $id: id }, (err: any, row: any) => {
        if (err) {
          reject(err);
        }
        resolve(row?.save);
      });
    });
    if (!saveData) {
      return null;
    }
    return JSON.parse(saveData) as CharacterSaveData;
  }

  storeCharacter(character: Character): void {
    this.db.run("INSERT OR REPLACE INTO saves (userId, save) VALUES ($id, $save)", {
      $id: character.userId,
      $save: JSON.stringify(character.save()),
    });
  }

  // async getUserRecord(token: string): Promise<UserRecord> {
  //   return this.USER_RECORDS[0];
  // }
}
