import type { SkillHrid } from "common/game/skills/SkillHrid";
import type { CharacterSkill } from "common/game/skills/CharacterSkill";
import { SimpleEventDispatcher } from "strongly-typed-events";
import type { SkillDetail } from "common/game/skills/SkillDetail";
import { Skills } from "common/game/skills/Skills";

export interface XpGained extends CharacterSkill {
  delta: number;
}

export interface LvlGained extends CharacterSkill {
  delta: number;
}

export class ClientSkills extends Skills {
  private readonly _characterSkills: Record<SkillHrid, CharacterSkill>;

  private _onXpGained = new SimpleEventDispatcher<XpGained>();
  private _onLvlGained = new SimpleEventDispatcher<LvlGained>();

  public get onXpGained() {
    return this._onXpGained.asEvent();
  }

  public get onLvlGained() {
    return this._onLvlGained.asEvent();
  }

  constructor(detailMap: Record<SkillHrid, SkillDetail>, levelExperienceTable: number[]) {
    super(detailMap, levelExperienceTable);

    this._characterSkills = {} as Record<SkillHrid, CharacterSkill>;
    this.skillList.forEach((detail) => {
      this._characterSkills[detail.hrid] = {
        skillHrid: detail.hrid,
        experience: 0,
        level: 1,
      };
    });
  }

  public updateCharacterSkills(skills: CharacterSkill[], notify = true): void {
    skills.forEach((info) => {
      const xpChanged = info.experience - this._characterSkills[info.skillHrid].experience;
      const lvlChanged = info.level - this._characterSkills[info.skillHrid].level;
      this._characterSkills[info.skillHrid] = info;

      if (!notify) {
        return;
      }
      if (xpChanged !== 0) {
        this._onXpGained.dispatch({
          ...this._characterSkills[info.skillHrid],
          delta: xpChanged,
        });
      }
      if (lvlChanged !== 0) {
        this._onLvlGained.dispatch({
          ...this._characterSkills[info.skillHrid],
          delta: lvlChanged,
        });
      }
    });
  }

  public get characterSkills() {
    return this._characterSkills;
  }

  public getXpLeft(skill: SkillHrid): number {
    const currentLevel = this._characterSkills[skill].level;
    const targetXp = this.levelExperienceTable[currentLevel + 1];
    return targetXp - this._characterSkills[skill].experience;
  }

  public getProgressPercentage(skill: SkillHrid): number {
    const currentLevel = this._characterSkills[skill].level;
    const currentXp = this._characterSkills[skill].experience;
    if (currentXp === 0) {
      return 0;
    }
    const previousXp = this.levelExperienceTable[currentLevel];
    const targetXp = this.levelExperienceTable[currentLevel + 1];
    const currentLevelXp = targetXp - previousXp;
    return (currentXp - previousXp) / currentLevelXp;
  }

  public getLevel(skillHrid: SkillHrid) {
    return this._characterSkills[skillHrid].level;
  }
}
