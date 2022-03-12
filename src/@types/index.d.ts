// Pega toda a tipagem de node_modules/@types/express/index.d.ts + o que passarmos abaixo
declare namespace Express {
  export interface Request {
    user_id: string;
  }
}

// Explicação: Sobrescrevendo a biblioteca do express para tornar o user_id disponível. Isso é chamado de Declaration Merging
// Depois disso, dar um reload no vscode. A partir dai, request. + ctrl+tab já aparece o user_id

// OBS: Adicionar lá em tsconfig.json, em typeRoots. O tsconfig irá validar tudo que estiver dentro da pasta
// OBS2: Após fazer isso, ainda ocorrerá uma erro. Para resolve-lo, basta adicionar o parâmetro --files quando for chamar o ts-node-dev  nos scripts ("dev": "ts-node-dev --files src/server.ts",)
// --> link: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/46861#issuecomment-769555377