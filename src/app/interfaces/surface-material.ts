export class SurfaceMaterial {
    identifier: string;
    name: string;

    constructor(identifier: string, name: string){
        this.identifier = identifier;
        this.name = name;
    }
}

export class SurfaceMaterials {
    static readonly Transparent = new SurfaceMaterial("transparent", "Transparent");
    static readonly AcousticCeilingTiles = new SurfaceMaterial("acoustic-ceiling-tiles", "Acoustic Ceiling Tiles");
    static readonly BrickBare = new SurfaceMaterial("brick-bare", "Brick Bare");
    static readonly BrickPainted = new SurfaceMaterial("brick-painted", "Brick Painted");
    static readonly BlockCoarse = new SurfaceMaterial("concrete-block-coarse", "Concrete Block Coarse");
    static readonly BlockPainted = new SurfaceMaterial("concrete-block-painted", "Concrete Block Painted");
    static readonly CurtainHeavy = new SurfaceMaterial("curtain-heavy", "Curtain Heavy");
    static readonly FiberglassInsulation = new SurfaceMaterial("fiberglass-insulation", "Fiberglass Insulation");
    static readonly GlassThin = new SurfaceMaterial("glass-thin", "Glass Thin");
    static readonly GlassThick = new SurfaceMaterial("glass-thick", "Glass Thick");
    static readonly Grass = new SurfaceMaterial("grass", "Grass");
    static readonly LinoleumOnConcrete = new SurfaceMaterial("linoleum-on-concrete", "Linoleum on Concrete");
    static readonly Marble = new SurfaceMaterial("marble", "Marble");
    static readonly Metal = new SurfaceMaterial("metal", "Metal");
    static readonly ParquetOnConcrete = new SurfaceMaterial("parquet-on-concrete", "Parquet on Concrete");
    static readonly PlasterRough = new SurfaceMaterial("plaster-rough", "Plaster Rough");
    static readonly PlasterSmooth = new SurfaceMaterial("plaster-smooth", "Plaster Smooth");
    static readonly PlywoodPanel = new SurfaceMaterial("plywood-panel", "Plywood Panel");
    static readonly PolishedConcreteOrTile = new SurfaceMaterial("polished-concrete-or-tile", "Polished Concrete or Tile");
    static readonly Sheetrock = new SurfaceMaterial("sheetrock", "Sheetrock");
    static readonly WaterOrIceSurface = new SurfaceMaterial("water-or-ice-surface", "Water or Ice Surface");
    static readonly WoodCeiling = new SurfaceMaterial("wood-ceiling", "Wood Ceiling");
    static readonly WoodPanel = new SurfaceMaterial("wood-panel", "Wood Panel");

    public static byIdentifier(identifier: string): SurfaceMaterial {
        let mapping = {
            "transparent": SurfaceMaterials.Transparent,
            "acoustic-ceiling-tiles": SurfaceMaterials.AcousticCeilingTiles,
            "brick-bare": SurfaceMaterials.BrickBare,
            "brick-painted": SurfaceMaterials.BrickPainted,
            "concrete-block-coarse": SurfaceMaterials.BlockCoarse,
            "concrete-block-painted": SurfaceMaterials.BlockPainted,
            "curtain-heavy": SurfaceMaterials.CurtainHeavy,
            "fiberglass-insulation": SurfaceMaterials.FiberglassInsulation,
            "glass-thin": SurfaceMaterials.GlassThin,
            "glass-thick": SurfaceMaterials.GlassThick,
            "grass": SurfaceMaterials.Grass,
            "linoleum-on-concrete": SurfaceMaterials.LinoleumOnConcrete,
            "marble": SurfaceMaterials.Marble,
            "metal": SurfaceMaterials.Metal,
            "parquet-on-concrete": SurfaceMaterials.ParquetOnConcrete,
            "plaster-rough": SurfaceMaterials.PlasterRough,
            "plaster-smooth": SurfaceMaterials.PlasterSmooth,
            "plywood-panel": SurfaceMaterials.PlywoodPanel,
            "polished-concrete-or-tile": SurfaceMaterials.PolishedConcreteOrTile,
            "sheetrock": SurfaceMaterials.Sheetrock,
            "water-or-ice-surface": SurfaceMaterials.WaterOrIceSurface,
            "wood-ceiling": SurfaceMaterials.WoodCeiling,
            "wood-panel": SurfaceMaterials.WoodPanel
        }
        return mapping[identifier];
    }
}