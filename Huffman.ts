class Huffman {
    static CompareFrequencies(a,b) {
        if (a.count < b.count)
            return -1;
        if (a.count > b.count)
            return 1;
        if (a.char < b.char)
            return -1;
        if (a.char > b.char)
            return 1;
        return 0;
    }

    static GetFrequenciesMap(s : string) : any {
        var result = {};

        for (var i = 0; i < s.length; i++) {
            var c = s[i];
            result[c] ? result[c]++ : result[c] = 1;
        }

        return result;
    }

    static GetAscendingFrequenciesArray(frequenciesMap : any) : any[] {
        var result = [];

        for (var c in frequenciesMap)
            if (frequenciesMap.hasOwnProperty(c))
                result.push({char: c, count: frequenciesMap[c]});

        return result.sort(Huffman.CompareFrequencies);
    }

    static GetHuffmanTree(ascendingFrequencyArray : any[]) : any {
        var result = [];

        for (var i = 0; i < ascendingFrequencyArray.length; i++)
            result.push(ascendingFrequencyArray[i]);

        var iter = function(nodes : any[]) {
            if (nodes.length == 1)
                return nodes[0];

            var minNodes = nodes.splice(0,2);
            nodes.push({
                    char: undefined, count: minNodes[0].count + minNodes[1].count,
                    left: minNodes[0], right: minNodes[1]
                });

            return iter(nodes.sort(Huffman.CompareFrequencies));
        };
        
        return iter(result);
    }

    static GetPathMap(tree : any) : any {
        var iter = function(node : any, map : any, path : string) {
            if (node.left != undefined)
                iter(node.left, map, path + "0");
            if (node.right != undefined)
                iter(node.right, map, path + "1");

            if (node.char != undefined)
                map[node.char] = path;

            return map;
        };

        return iter(tree, {}, "");
    }

    static Encode(s : string, pathMap : any) : string {
        var result = "";

        for (var i = 0; i < s.length; i++) {
            var c = s[i];
            result += pathMap[c];
        }

        return result;
    }

    static Decode(s : string, tree : any) : string {
        var result = "";
        var root = tree;
        var node = root;
        for (var i = 0; i < s.length; i++) {
            var b = s[i];

            if (b == "0") {
                if (node.left == undefined) {
                    result += node.char;
                    node = root.left;
                }
                else {
                    node = node.left;
                }
            }
            else {
                if (node.right == undefined) {
                    result += node.char;
                    node = root.right;
                }
                else {
                    node = node.right;
                }
            }
        }
        return result+=node.char;
    }
}