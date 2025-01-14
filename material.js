const BRICKFACEKEYS = [ 'right', 'left', 'top', 'bottom', 'front', 'back' ]
const BACKGROUNDFACEKEYS = [ 'left', 'right', 'top', 'bottom', 'front', 'back' ]
const WALLKEYS = new Set([ 'left', 'right', 'front', 'back' ])
let itemsToLoad = 0
  , itemsLoaded = 0
  , loading = document.getElementById('loading')
  , loadingCnt = document.getElementById('loadingCnt')
function loadEnd () {
  itemsLoaded++

  if (itemsLoaded == itemsToLoad) 
    loading.hidden = true

  loadingCnt.innerText = `(${itemsLoaded}/${itemsToLoad})`
}

class MaterialManager {
  constructor (arr) {
    this.list = {}
    if (arr) 
      arr.forEach(d => {
        switch (d.type) {
          case MaterialManager.BACKGROUND:
            this.addBackground(d)
            break
          case MaterialManager.BRICKSTYLE:
            this.addBrickStyle(d)
            break
        }
      })
  }

  get (label) {
    let m = this.list[label]
    return m ? m.textures : null
  }

  getList (type) {
    let list = []
    for (let [ k, v ] of Object.entries(this.list)) 
      if (v.type == type) 
        list.push(k)
    return list
  }

  get brickStyles () {
    return this.getList(MaterialManager.BRICKSTYLE)
  }

  get backgrounds () {
    return this.getList(MaterialManager.BACKGROUND)
  }

  addBackground ({ label, sameWall = false } = {}) {
    loading.hidden = false
    itemsToLoad ++
    this.list[label] = {
      type: MaterialManager.BACKGROUND,
      textures: 
        new THREE.CubeTextureLoader()
          .load(BACKGROUNDFACEKEYS.map(i =>
            `img/${label}-${sameWall && WALLKEYS.has(i) ? 'wall' : i}.png`),
            e => loadEnd(),
            )
    }
  }

  addBrickStyle ({ label, length } = {}) {
    loading.hidden = false
    itemsToLoad += length
    this.list[label] = {
      type: MaterialManager.BRICKSTYLE,
      textures: 
        Array.from({ length }, (_, i) =>
          new THREE
            .TextureLoader()
            .load(`img/${label}-${i + 1}.png`,
              e => loadEnd(),
              ))
    }
  }
}

MaterialManager.BACKGROUND = 0
MaterialManager.BRICKSTYLE = 1

export { MaterialManager, BRICKFACEKEYS, BACKGROUNDFACEKEYS }
