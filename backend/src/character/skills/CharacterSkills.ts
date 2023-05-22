import { SkillHrid } from "common/game/skills/SkillHrid";
import { CharacterSkill } from "common/game/skills/CharacterSkill";
import { CharacterFeature } from "backend/character/CharacterFeature";
import { Character } from "backend/character/Character";
import { Game } from "common/Game";
import { CharacterSkillsSaveData } from "backend/character/skills/CharacterSkillsSaveData";

export class CharacterSkills extends CharacterFeature {
  private _skills: Record<SkillHrid, CharacterSkill> = {} as unknown as Record<SkillHrid, CharacterSkill>;

  constructor() {
    super("skills");
  }

  public inject(character: Character, game: Game) {
    super.inject(character, game);
    this._game.skills.skillList.forEach((skillDetail) => {
      this._skills[skillDetail.hrid] = {
        level: 1,
        skillHrid: skillDetail.hrid,
        experience: 0,
      };
    });
  }

  public gainExp(skill: SkillHrid, amount: number) {
    const oldLevel = this._skills[skill].level;
    this._skills[skill].experience += amount;

    const newLevel = this._game.skills.getLevelForExp(this._skills[skill].experience);
    if (oldLevel != newLevel) {
      this._skills[skill].level = newLevel;
      console.log("Level up!", newLevel);
    }
    this._character.sendSkillsUpdated([this._skills[skill]]);
  }

  load(data: CharacterSkillsSaveData): void {
    data?.skills?.forEach((skill) => {
      this._skills[skill.skillHrid] = skill;
    });
  }

  save(): CharacterSkillsSaveData {
    return {
      skills: Object.values(this._skills),
    };
  }
}
