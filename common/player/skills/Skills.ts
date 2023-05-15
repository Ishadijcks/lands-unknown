import type { SkillHrid } from "common/player/skills/SkillHrid";
import type { SkillDetail } from "common/player/skills/SkillDetail";

export class Skills {
  private readonly _detailMap: Record<SkillHrid, SkillDetail>;
  private readonly _levelExperienceTable: number[];

  public readonly skillList: SkillDetail[];

  constructor(detailMap: Record<SkillHrid, SkillDetail>, _levelExperienceTable: number[]) {
    this._detailMap = detailMap;
    this._levelExperienceTable = _levelExperienceTable;

    this.skillList = Object.values(detailMap).sort((a, b) => a.sortIndex - b.sortIndex);
  }

  public get levelExperienceTable(): number[] {
    return this._levelExperienceTable;
  }

  public getLevelForExp(exp: number) {
    return this._levelExperienceTable.findIndex((value) => {
      return value > exp;
    });
  }
}
