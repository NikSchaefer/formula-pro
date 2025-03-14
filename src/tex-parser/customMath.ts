/* eslint-disable @typescript-eslint/no-explicit-any */
import { create, all, MathJsInstance, sort } from "mathjs";
// import mathjsSimpleIntegral from "mathjs-simple-integral";

// use BigNumber to reduce floating-point rounding errors
const math = create(all, {
  number: "BigNumber",
  precision: 64,
}) as MathJsInstance;

// Configuration for angle mode
const config = {
  angles: "rad", // 'rad' or 'deg'
};

// Create angle-aware trig functions
const replacements: Record<string, any> = {};
const trigFunctions = ["sin", "cos", "tan", "sec", "cot", "csc"];

trigFunctions.forEach((name) => {
  const originalFn = math[name as keyof MathJsInstance];

  const fnNumber = (x: any) => {
    // Convert degrees to radians if in deg mode
    return config.angles === "deg"
      ? originalFn(math.multiply(x, math.divide(math.pi, 180)))
      : originalFn(x);
  };

  replacements[name] = math.typed(name, {
    "number | BigNumber": fnNumber,
    "Array | Matrix": (x: any) => math.map(x, fnNumber),
  });
});

// Import the replacements second
math.import(replacements, { override: true });

function arcTrigTyped(name: string, func: any) {
  const compute = (x: any) => {
    const result = func(math.bignumber(x));
    // Convert result from radians to degrees if in deg mode
    return config.angles === "deg"
      ? math.multiply(result, math.divide(180, math.pi))
      : result;
  };

  const typed = math.typed(name, {
    "number | BigNumber": (x: any) => compute(x),
    "Array | Matrix": (x: any) => math.map(x, (x: any) => compute(x)),
  });

  return typed;
}

// Additional functions to be passed to the scope of math.evaluate(scope)
// (not defined in mathjs)
const mathImport = {
  lastFn: "",
  lastArgs: [],
  eigenvalues: (matrix: any) => math.eigs(matrix).values,
  // @ts-expect-error not sure yet lol
  eigenvectors: (matrix: any) => math.eigs(matrix).vectors,
  comp: (a: any, b: any) => math.divide(math.dot(a, b), math.norm(a)), // component of b along a
  proj: (a: any, b: any) =>
    math.multiply(
      math.divide(a, math.norm(a)),
      math.divide(math.dot(a, b), math.norm(a)),
    ), // projection of b along a
  setAngleMode: (mode: "rad" | "deg") => {
    config.angles = mode;
  },
  getAngleMode: () => config.angles,
  sort: (...args: any[]) => {
    if (args.length === 1 && "toArray" in args[0]) {
      const array = args[0].toArray().flat();
      return sort(array, "asc");
    } else {
      return sort(args, "asc");
    }
  },
  len: (...args: any[]) => {
    if (args.length === 1 && "toArray" in args[0]) {
      return args[0].toArray().flat().length;
    } else {
      return args.length;
    }
  },
  // int: (f: any, a: any, b: any) => mathjsSimpleIntegral(f, a, b),
  total: (...args: any[]) => {
    if (args.length === 1 && "toArray" in args[0]) {
      return args[0]
        .toArray()
        .flat()
        .reduce((a: any, b: any) => a + b, 0);
    } else {
      return args.reduce((a: any, b: any) => a + b, 0);
    }
  },
  rand: (n: number, m: number) => {
    return math.random(n, m);
  },
  randi: (n: number, m: number) => {
    return math.randomInt(n, m);
  },
  nCr: (n: number, r: number) => {
    return math.combinations(n, r);
  },
  nPr: (n: number, r: number) => {
    return math.permutations(n, r);
  },
  // Calculate the magnitude of a vector in however many dimensions
  mag: (...args: any[]) => {
    if (args.length === 1 && "toArray" in args[0]) {
      // Handle matrix input
      const matrix = args[0];
      return math.sqrt(
        matrix
          .toArray()
          .flat()
          .reduce((a: any, b: any) => a + b ** 2, 0),
      );
    } else {
      // Handle multiple number inputs
      return math.sqrt(args.reduce((a: any, b: any) => a + b ** 2, 0));
    }
  },
  arcsin: (x: number) => arcTrigTyped("arcsin", math.asin)(x),
  arccos: (x: number) => arcTrigTyped("arccos", math.acos)(x),
  arctan: (x: number) => arcTrigTyped("arctan", math.atan)(x),
  arccot: (x: number) => arcTrigTyped("arccot", math.atan)(1 / x),
  arccsc: (x: number) => arcTrigTyped("arccsc", math.asin)(1 / x),
  arcsec: (x: number) => arcTrigTyped("arcsec", math.acos)(1 / x),
};

math.import(mathImport, {
  override: true,
});

export default math;
