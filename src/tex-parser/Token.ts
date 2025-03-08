/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
export const enum TokenType {
    Number,
    Variable,
    Equals,
    Plus,
    Minus,
    Star,
    Times,
    Slash,
    Caret,
    Comma,
    Lbrace,
    Rbrace,
    Lparen,
    Rparen,
    Bar,
    Amp,
    Dblbackslash,
    Sqrt,
    Frac,
    Sin,
    Cos,
    Tan,
    Csc,
    Sec,
    Cot,
    Arcsin,
    Arccos,
    Arctan,
    Sinh,
    Cosh,
    Tanh,
    Log,
    Ln,
    Pi,
    E,
    Omega,
    Alpha,
    Beta,
    Gamma,
    Delta,
    Epsilon,
    Zeta,
    Theta,
    Iota,
    Kappa,
    Lambda,
    Mu,
    Nu,
    Xi,
    Begin,
    End,
    Matrix,
    Left,
    Right,
    Eof,
    T,
    Det,
    Opname,
    Eigenvalues,
    Eigenvectors,
    Cross,
    Proj,
    Comp,
    Norm,
    Inv,
    Space, // ignored by the lexer
    Underscore,
    Mean,
    Median,
    Mode,
    Sort,
    Std,
    Len,
    nPr,
    nCr,
    Sum,
    Abs,
    Total,
    Round,
    Max,
    Min,
    Gcd,
    Lcm,
    Range,
    Flat,
    Zeros,
    Ones,
    Rand,
    Randi,
    Ans,
    Mag,
}

export const lexemeToType: { [key: string]: TokenType } = {
    "=": TokenType.Equals,
    "+": TokenType.Plus,
    "-": TokenType.Minus,
    "*": TokenType.Star,
    "\\cdot": TokenType.Star,
    "\\times": TokenType.Times,
    "^": TokenType.Caret,
    "/": TokenType.Slash,
    ",": TokenType.Comma,
    "{": TokenType.Lbrace,
    "}": TokenType.Rbrace,
    "(": TokenType.Lparen,
    ")": TokenType.Rparen,
    "|": TokenType.Bar,
    "&": TokenType.Amp,
    bmatrix: TokenType.Matrix,
    "\\\\": TokenType.Dblbackslash,
    "\\sqrt": TokenType.Sqrt,
    "\\frac": TokenType.Frac,
    "\\sin": TokenType.Sin,
    "\\cos": TokenType.Cos,
    "\\tan": TokenType.Tan,
    "\\csc": TokenType.Csc,
    "\\sec": TokenType.Sec,
    "\\cot": TokenType.Cot,
    "\\arcsin": TokenType.Arcsin,
    "\\arccos": TokenType.Arccos,
    "\\arctan": TokenType.Arctan,
    "\\sinh": TokenType.Sinh,
    "\\cosh": TokenType.Cosh,
    "\\tanh": TokenType.Tanh,
    "\\log": TokenType.Log,
    "\\ln": TokenType.Ln,
    "\\pi": TokenType.Pi,
    e: TokenType.E,
    "\\omega": TokenType.Omega,
    "\\alpha": TokenType.Alpha,
    "\\beta": TokenType.Beta,
    "\\gamma": TokenType.Gamma,
    "\\delta": TokenType.Delta,
    "\\epsilon": TokenType.Epsilon,
    "\\zeta": TokenType.Zeta,
    "\\theta": TokenType.Theta,
    "\\iota": TokenType.Iota,
    "\\kappa": TokenType.Kappa,
    "\\lambda": TokenType.Lambda,
    "\\mu": TokenType.Mu,
    "\\begin": TokenType.Begin,
    "\\end": TokenType.End,
    "\\left": TokenType.Left,
    "\\right": TokenType.Right,
    T: TokenType.T,
    "\\det": TokenType.Det,
    "\\operatorname": TokenType.Opname,
    eigenvectors: TokenType.Eigenvectors,
    eigenvalues: TokenType.Eigenvalues,
    cross: TokenType.Cross,
    proj: TokenType.Proj,
    comp: TokenType.Comp,
    norm: TokenType.Norm,
    inv: TokenType.Inv,
    mean: TokenType.Mean,
    median: TokenType.Median,
    sort: TokenType.Sort,
    _: TokenType.Underscore,
    std: TokenType.Std,
    len: TokenType.Len,
    nPr: TokenType.nPr,
    nCr: TokenType.nCr,
    sum: TokenType.Sum,
    abs: TokenType.Abs,
    total: TokenType.Total,
    round: TokenType.Round,
    "\\max": TokenType.Max,
    "\\min": TokenType.Min,
    "\\gcd": TokenType.Gcd,
    lcm: TokenType.Lcm,
    range: TokenType.Range,
    flat: TokenType.Flat,
    zeros: TokenType.Zeros,
    ones: TokenType.Ones,
    rand: TokenType.Rand,
    randi: TokenType.Randi,
    ans: TokenType.Ans,
    mag: TokenType.Mag,
};

/**
 * A mapping from a token type to the operation it represents.
 * The operation is the name of a function in the mathjs namespace,
 * or of a function to be defined in scope (i.e. in the argument to math.evaluate())
 */
export const typeToOperation: { [key in TokenType]?: string } = {
    [TokenType.Plus]: "add",
    [TokenType.Minus]: "subtract",
    [TokenType.Star]: "multiply",
    [TokenType.Times]: "multiply",
    [TokenType.Caret]: "pow",
    [TokenType.Slash]: "divide",
    [TokenType.Frac]: "divide",
    [TokenType.Bar]: "abs",
    [TokenType.Sqrt]: "sqrt",
    [TokenType.Sin]: "sin",
    [TokenType.Cos]: "cos",
    [TokenType.Tan]: "tan",
    [TokenType.Csc]: "csc",
    [TokenType.Sec]: "sec",
    [TokenType.Cot]: "cot",
    [TokenType.Arcsin]: "arcsin",
    [TokenType.Arccos]: "arccos",
    [TokenType.Arctan]: "arctan",
    [TokenType.Sinh]: "sinh",
    [TokenType.Cosh]: "cosh",
    [TokenType.Tanh]: "tanh",
    [TokenType.Log]: "log10",
    [TokenType.Ln]: "log",
    [TokenType.Det]: "det",
    [TokenType.Eigenvectors]: "eigenvectors",
    [TokenType.Eigenvalues]: "eigenvalues",
    [TokenType.Cross]: "cross",
    [TokenType.Proj]: "proj",
    [TokenType.Comp]: "comp",
    [TokenType.Norm]: "norm",
    [TokenType.Inv]: "inv",
    [TokenType.Mean]: "mean",
    [TokenType.Median]: "median",
    [TokenType.Mode]: "mode",
    [TokenType.Sort]: "sort",
    [TokenType.Std]: "std",
    [TokenType.nPr]: "nPr",
    [TokenType.nCr]: "nCr",
    [TokenType.Len]: "len",
    [TokenType.Sum]: "sum",
    [TokenType.Abs]: "abs",
    [TokenType.Total]: "total",
    [TokenType.Round]: "round",
    [TokenType.Max]: "max",
    [TokenType.Min]: "min",
    [TokenType.Gcd]: "gcd",
    [TokenType.Lcm]: "lcm",
    [TokenType.Range]: "range",
    [TokenType.Flat]: "flatten",
    [TokenType.Zeros]: "zeros",
    [TokenType.Ones]: "ones",
    [TokenType.Rand]: "rand",
    [TokenType.Randi]: "randi",
    [TokenType.Ans]: "ans",
    [TokenType.Mag]: "mag",
};

interface Token {
    lexeme: string;
    type: TokenType;
    pos: number;
}

class Token {
    /**
     * A token in a TeX string.
     * @param {string} lexeme string literal of the token
     * @param {TokenType} type type of the token
     * @param {Number} pos position of the token in the input string
     *
     * @constructor Token
     */
    constructor(lexeme: string, type: TokenType, pos: number) {
        this.lexeme = lexeme;
        this.type = type;
        this.pos = pos;
    }
}

export default Token;
