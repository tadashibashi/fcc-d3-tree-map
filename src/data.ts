export interface TreemapData {
    name: string;
    children: Array<TreemapData>;
    value?: string;
    category?: string;
}

export namespace TreemapData {
    // Gets the index of a name of a child
    export function indexOf(name: string, children: Array<TreemapData>) {
        for (let i = 0; i < children.length; ++i) {
            if (name === children[i].name)
                return i;
        }

        return -1;
    }

    // Adds children's values together
    export function sum(category: TreemapData): number {
        return category.children.reduce((prev, entry) => parseFloat(entry.value || '0') + prev, 0);
    }
}

export function getData(url: string): TreemapData | any {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();

    return (xhr.status === 200) ?
        JSON.parse(xhr.response) :
        null;
}

