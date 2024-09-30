const testcase1 = {
  "keys": {
    "n": 4,
    "k": 3
  },
  "1": {
    "base": "10",
    "value": "4"
  },
  "2": {
    "base": "2",
    "value": "111"
  },
  "3": {
    "base": "10",
    "value": "12"
  },
  "6": {
    "base": "4",
    "value": "213"
  }
};

const testcase2 = {
  "keys": {
      "n": 9,
      "k": 6
  },
  "1": {
      "base": "10",
      "value": "28735619723837"
  },
  "2": {
      "base": "16",
      "value": "1A228867F0CA"
  },
  "3": {
      "base": "12",
      "value": "32811A4AA0B7B"
  },
  "4": {
      "base": "11",
      "value": "917978721331A"
  },
  "5": {
      "base": "16",
      "value": "1A22886782E1"
  },
  "6": {
      "base": "10",
      "value": "28735619654702"
  },
  "7": {
      "base": "14",
      "value": "71AB5070CC4B"
  },
  "8": {
      "base": "9",
      "value": "122662581541670"
  },
  "9": {
      "base": "8",
      "value": "642121030037605"
  }
}
function decodeValues(points) {
  return Object.entries(points)
    .filter(([key]) => key !== 'keys')
    .map(([x, { base, value }]) => ({
      x: parseInt(x, 10),
      y: parseInt(value, parseInt(base, 10))
    }));
}
function lagrangeInterpolation(points, k) {
  let constantTerm = 0;

  for (let i = 0; i < k; i++) {
    let { x: xi, y: yi } = points[i];
    let li = 1;

    for (let j = 0; j < k; j++) {
      if (i !== j) {
        let { x: xj } = points[j];
        li *= -xj / (xi - xj);
      }
    }

    constantTerm += yi * li;
  }

  return constantTerm;
}

function findWrongPoints(points, k, constantTerm) {
  const wrongPoints = [];

  for (let i = k; i < points.length; i++) {
    const { x, y } = points[i];
    let calculatedY = 0;

    for (let j = 0; j < k; j++) {
      let { x: xi, y: yi } = points[j];
      let li = 1;

      for (let l = 0; l < k; l++) {
        if (j !== l) {
          let { x: xj } = points[l];
          li *= (x - xj) / (xi - xj);
        }
      }

      calculatedY += yi * li;
    }

    if (Math.round(calculatedY) !== y) {
      wrongPoints.push({ x, y });
    }
  }

  return wrongPoints;
}
function main() {
  const points1 = decodeValues(testcase1);
  const points2 = decodeValues(testcase2);
  const k1 = testcase1.keys.k;
  const k2 = testcase2.keys.k;
  const constantTerm1 = lagrangeInterpolation(points1, k1);
  const constantTerm2 = lagrangeInterpolation(points2, k2);


  console.log('Secret for testcase 1:', constantTerm1);
  console.log('Secret for testcase 2:', constantTerm2);
  const wrongPoints = findWrongPoints(points2, k2, constantTerm2);
  console.log('Wrong points for testcase 2:', wrongPoints);
}

main();
