// Complexity figures are the standard, well-established values for each
// algorithm — nothing here is invented or approximated incorrectly.

export const sortingAlgorithms = {
  bubble: {
    name: "Bubble Sort",
    category: "sorting",
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    explanation: "Repeatedly steps through the array, comparing adjacent elements and swapping them if they're in the wrong order. Passes continue until no swaps are needed.",
    code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    steps: (input) => {
      const arr = [...input];
      const steps = [];
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          steps.push({ array: [...arr], compare: [j, j + 1], swap: false });
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            steps.push({ array: [...arr], compare: [j, j + 1], swap: true });
          }
        }
      }
      steps.push({ array: [...arr], compare: [], swap: false, done: true });
      return steps;
    },
  },
  selection: {
    name: "Selection Sort",
    category: "sorting",
    complexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    explanation: "Divides the array into a sorted and unsorted part, repeatedly selecting the minimum element from the unsorted part and moving it to the end of the sorted part.",
    code: `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}`,
    steps: (input) => {
      const arr = [...input];
      const steps = [];
      for (let i = 0; i < arr.length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
          steps.push({ array: [...arr], compare: [min, j], swap: false });
          if (arr[j] < arr[min]) min = j;
        }
        if (min !== i) {
          [arr[i], arr[min]] = [arr[min], arr[i]];
          steps.push({ array: [...arr], compare: [i, min], swap: true });
        }
      }
      steps.push({ array: [...arr], compare: [], swap: false, done: true });
      return steps;
    },
  },
  insertion: {
    name: "Insertion Sort",
    category: "sorting",
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    explanation: "Builds the sorted array one element at a time, taking each new element and inserting it into its correct position among the already-sorted elements.",
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    steps: (input) => {
      const arr = [...input];
      const steps = [];
      for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        steps.push({ array: [...arr], compare: [i], swap: false });
        while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          j--;
          steps.push({ array: [...arr], compare: [j + 1], swap: true });
        }
        arr[j + 1] = key;
        steps.push({ array: [...arr], compare: [j + 1], swap: true });
      }
      steps.push({ array: [...arr], compare: [], swap: false, done: true });
      return steps;
    },
  },
};

export const searchingAlgorithms = {
  linear: {
    name: "Linear Search",
    category: "searching",
    complexity: { best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(1)" },
    explanation: "Checks each element in sequence until the target is found or the array ends. Works on unsorted data.",
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    steps: (input, target) => {
      const steps = [];
      for (let i = 0; i < input.length; i++) {
        steps.push({ array: input, compare: [i], found: input[i] === target ? i : -1 });
        if (input[i] === target) break;
      }
      steps.push({ array: input, compare: [], done: true });
      return steps;
    },
  },
  binary: {
    name: "Binary Search",
    category: "searching",
    complexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
    explanation: "Repeatedly halves a sorted array's search range by comparing the target to the middle element.",
    code: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    steps: (sortedInput, target) => {
      const steps = [];
      let lo = 0, hi = sortedInput.length - 1;
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        steps.push({ array: sortedInput, compare: [mid], range: [lo, hi], found: sortedInput[mid] === target ? mid : -1 });
        if (sortedInput[mid] === target) break;
        if (sortedInput[mid] < target) lo = mid + 1;
        else hi = mid - 1;
      }
      steps.push({ array: sortedInput, compare: [], done: true });
      return steps;
    },
  },
};

export const graphAlgorithms = {
  bfs: {
    name: "Breadth-First Search",
    category: "graph",
    complexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)", space: "O(V)" },
    explanation: "Explores a graph level by level using a queue, visiting all neighbors of a node before moving to the next level.",
    code: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of graph[node]) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  return order;
}`,
  },
  dfs: {
    name: "Depth-First Search",
    category: "graph",
    complexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)", space: "O(V)" },
    explanation: "Explores a graph by going as deep as possible along each branch using a stack (or recursion) before backtracking.",
    code: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  const order = [start];
  for (const next of graph[start]) {
    if (!visited.has(next)) {
      order.push(...dfs(graph, next, visited));
    }
  }
  return order;
}`,
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    category: "graph",
    complexity: { best: "O((V + E) log V)", average: "O((V + E) log V)", worst: "O((V + E) log V)", space: "O(V)" },
    explanation: "Finds the shortest path from a source node to all other nodes in a weighted graph with non-negative edge weights, using a priority queue.",
    code: `function dijkstra(graph, start) {
  const dist = { [start]: 0 };
  const visited = new Set();
  const pq = [[0, start]];
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, node] = pq.shift();
    if (visited.has(node)) continue;
    visited.add(node);
    for (const [next, weight] of graph[node]) {
      const nd = d + weight;
      if (dist[next] === undefined || nd < dist[next]) {
        dist[next] = nd;
        pq.push([nd, next]);
      }
    }
  }
  return dist;
}`,
  },
};
