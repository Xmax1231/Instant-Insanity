const MATERIAL_LIST = {}

/**
 * 材料
 */
class MaterialEntry { // eslint-disable-line no-unused-vars
  /**
   * 初始化
   * @param {string} materialName
   * @param {string[]} fileNames
   */
  constructor(materialName, fileNames) {
    this.materialName = materialName
    this.fileNames = fileNames
  }
}

function addMaterial (materialName, fileNames) {
  MATERIAL_LIST[materialName] = new MaterialEntry(materialName, fileNames)
}

function getMaterial (materialName) {
  return MATERIAL_LIST[materialName]
}

addMaterial('test', [1,2,3,4,5,6].map(i => `dice-w${i}.png`))
addMaterial('octant', [1,2,3,4,5,6].map(i => `octant-w${i}.png`))

export { getMaterial }