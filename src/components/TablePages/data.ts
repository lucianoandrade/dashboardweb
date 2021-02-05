export interface Data {
  name: string;
  views: number;
}

export function createData(name: string, views: number): Data {
  return { name, views };
}

export const rows = [
  createData('/home', 450),
  createData('/store.html', 450),
  createData('/quickview.html', 450),
  createData('/signin.html', 450),
  createData('/acordos.html', 450),
  createData('/dividas.html', 450),
  createData('/basket.html', 450),
  createData('/homecpf.hmtl', 450),
  createData('/termosecondicoes.html', 450),
  createData('/store.html/quickview', 450),
  createData('/teste.html/quickview', 450),
  createData('/teste2.html/quickview', 450),
  createData('/teste3.html/quickview', 450),
];

export const colors = [
  '#7DE315',
  '#14A0C1',
  '#F1C422',
  '#1A75BA',
  '#A0AAB5',
  '#A0AAB5',
  '#A0AAB5',
  '#A0AAB5',
  '#A0AAB5',
  '#A0AAB5',
  '#A0AAB5',
  '#A0AAB5',
  '#A0AAB5',
];
