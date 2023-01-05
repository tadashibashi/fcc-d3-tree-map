
export interface DataSetInfo {
    Url: string;
    Title: string;
    Description: string;
    Units: string;
}

export namespace Const {
    export const DataSet = {
        Kickstarter: {
            Url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json",
            Title: "Kickstarter Pledges",
            Description: "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
            Units: "Pledges"
        } as DataSetInfo,
        VideoGames: {
            Url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json",
            Title: "Video Game Sales",
            Description: "Top 100 Most Sold Video Games Grouped by Platform",
            Units: "Million Units"
        } as DataSetInfo,
        Movies: {
            Url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json",
            Title: "Movie Sales",
            Description: "Top 100 Highest Grossing Movies Grouped By Genre",
            Units: "$USD"
        } as DataSetInfo
    };

    export const DefaultDataSet = DataSet.VideoGames;

    export const Treemap_Width = 1200;
    export const Treemap_Height = 600;

    export const Textbox_TextStyle = "font-family:sans-serif;font-size:.7rem;padding:.2rem;overflow:hidden;pointer-events:none;"

    export const App_Id = "app";

    export const CategoryColors: Array<string> = [
        "#87CEFA",
        "#FFA07A",
        "#77CD55",
        "#BA99FF",
        "#FF99AA",
        "#AFA0AF",
        "#C9C09A",
        "#FFDEAD",
        "#FFC0FF",
        "#B0E0E6",
        "#CCCACA",
        "#9A9A32",
        "#CCAA99",
        "#F0E68C",
        "#DAA520",
        "#76A2AF",
        "#C0CCFF",
        "#22DDAA",
        "#AB9AAB"
    ];
}